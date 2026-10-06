import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Canvas, Circle, Ellipse, FabricImage, FabricObject, Path, Pattern, PencilBrush, Point, Rect, Textbox } from 'fabric';

type RugShape = 'rectangle' | 'circle' | 'oval' | 'organic';
type RugPattern = 'plain' | 'checker' | 'waves';
type EditorTool = 'select' | 'draw';
interface DesignSettings {
  name: string;
  shape: RugShape;
  pattern: RugPattern;
  width: number;
  height: number;
  baseColor: string;
  accentColor: string;
  use: string;
  finish: string;
  notes: string;
}
interface Draft {
  version: 1;
  settings: DesignSettings;
  objects: Record<string, unknown>[];
}

const DEFAULTS: DesignSettings = {
  name: 'Mi custom rug', shape: 'rectangle', pattern: 'checker', width: 80, height: 60,
  baseColor: '#ff4fb8', accentColor: '#68f2cf', use: 'Piso', finish: 'Por definir', notes: ''
};

@Component({
  selector: 'app-tufting-diseno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tufting-diseno.component.html',
  styleUrl: './tufting-diseno.component.css'
})
export class TuftingDisenoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorCanvas') private canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasHost') private canvasHost!: ElementRef<HTMLDivElement>;
  @ViewChild('resetConfirm') private resetConfirm!: ElementRef<HTMLDialogElement>;
  readonly design = signal<DesignSettings>({ ...DEFAULTS });
  readonly tab = signal<'rug' | 'art' | 'details'>('rug');
  readonly tool = signal<EditorTool>('select');
  readonly selected = signal(false);
  readonly selectedText = signal<string | null>(null);
  readonly selectedColor = signal('#24142f');
  readonly colorEditable = signal(false);
  readonly objectCount = signal(0);
  readonly brushColor = signal('#24142f');
  readonly brushSize = signal(20);
  readonly textInput = signal('TU IDEA');
  readonly textFont = signal('Arial');
  readonly busy = signal(true);
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);
  readonly saved = signal(false);
  readonly message = signal('');
  readonly error = signal('');
  readonly palette = [
    { name: 'Rosa', color: '#ff4fb8' }, { name: 'Menta', color: '#68f2cf' },
    { name: 'Morado', color: '#24142f' }, { name: 'Blanco', color: '#ffffff' },
    { name: 'Amarillo', color: '#ffe16b' }, { name: 'Azul', color: '#73baf5' },
    { name: 'Lila', color: '#baa3ef' }, { name: 'Coral', color: '#ff826b' }
  ];
  readonly shapes: { id: RugShape; name: string; icon: string }[] = [
    { id: 'rectangle', name: 'Rectangular', icon: 'fa-square' },
    { id: 'circle', name: 'Circular', icon: 'fa-circle' },
    { id: 'oval', name: 'Ovalado', icon: 'fa-egg' },
    { id: 'organic', name: 'Organico', icon: 'fa-cloud' }
  ];
  readonly patterns: { id: RugPattern; name: string }[] = [
    { id: 'plain', name: 'Liso' }, { id: 'checker', name: 'Ajedrez' }, { id: 'waves', name: 'Ondas' }
  ];
  private canvas?: Canvas;
  private base?: Rect;
  private resizeObserver?: ResizeObserver;
  private history: string[] = [];
  private historyIndex = -1;
  private saveTimer?: ReturnType<typeof setTimeout>;
  private disposed = false;
  private readonly storageKey = 'unialre-tufting-design-v1';

  async ngAfterViewInit(): Promise<void> {
    this.canvas = new Canvas(this.canvasElement.nativeElement, {
      width: 900, height: 700, preserveObjectStacking: true, selection: false, enableRetinaScaling: true
    });
    this.canvas.freeDrawingBrush = new PencilBrush(this.canvas);
    this.canvas.on('selection:created', () => this.syncSelection());
    this.canvas.on('selection:updated', () => this.syncSelection());
    this.canvas.on('selection:cleared', () => this.syncSelection());
    this.canvas.on('object:modified', () => { this.syncSelection(); this.record(); });
    this.canvas.on('path:created', () => this.record());
    this.canvas.on('text:editing:exited', () => { this.syncSelection(); this.record(); });
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvasHost.nativeElement);
    this.renderRug();
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const draft: Draft = JSON.parse(raw);
        if (!this.validDraft(draft)) throw new Error('Invalid draft');
        await this.restore(draft);
        this.message.set('Recuperamos tu ultimo boceto en este navegador.');
        this.saved.set(true);
      }
    } catch {
      this.error.set('No se pudo recuperar el boceto guardado. Puedes crear uno nuevo.');
    } finally {
      if (!this.disposed) {
        this.busy.set(false);
        this.record(false);
        this.resizeCanvas();
      }
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.saveTimer);
    if (!this.busy()) this.saveDraft(false);
    this.disposed = true;
    this.resizeObserver?.disconnect();
    void this.canvas?.dispose();
  }

  navigateTabs(event: KeyboardEvent): void {
    const tabs = ['rug', 'art', 'details'] as const;
    const index = tabs.indexOf(this.tab());
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    this.tab.set(tabs[next]);
    document.getElementById(`${tabs[next]}-tab`)?.focus();
  }

  setSetting<K extends keyof DesignSettings>(key: K, value: DesignSettings[K]): void {
    if (this.busy()) return;
    this.design.update((current) => ({ ...current, [key]: value }));
    if (key === 'shape' && value === 'circle') {
      this.design.update((current) => ({ ...current, height: current.width }));
    }
    this.renderRug(key === 'shape');
    this.record();
  }

  setDimension(key: 'width' | 'height', event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Math.round(input.valueAsNumber);
    if (!Number.isFinite(value) || value < 20 || value > 250) {
      input.value = String(this.design()[key]);
      this.error.set('Elige una medida entre 20 y 250 cm. Para otras medidas, consultanos.');
      return;
    }
    this.error.set('');
    this.design.update((current) => ({
      ...current, [key]: value, ...(current.shape === 'circle' ? { width: value, height: value } : {})
    }));
    this.renderRug(true);
    this.record();
  }

  setTool(tool: EditorTool): void {
    if (!this.canvas || this.busy()) return;
    this.tool.set(tool);
    this.canvas.isDrawingMode = tool === 'draw';
    if (tool === 'draw') this.canvas.discardActiveObject();
    this.updateBrush();
    this.canvas.requestRenderAll();
  }

  updateBrush(): void {
    if (!this.canvas?.freeDrawingBrush) return;
    this.canvas.freeDrawingBrush.color = this.brushColor();
    this.canvas.freeDrawingBrush.width = this.brushSize();
  }

  addText(): void {
    const text = this.textInput().trim();
    if (!text || !this.canvas || this.busy()) return;
    const bounds = this.rugBounds();
    this.addObject(new Textbox(text.slice(0, 80), {
      left: 450, top: 350, originX: 'center', originY: 'center',
      width: bounds.width * 0.75, fontSize: Math.min(bounds.width / 6, 80),
      fontFamily: this.textFont(), fontWeight: 'bold', textAlign: 'center', fill: this.brushColor()
    }));
  }

  addMotif(kind: 'star' | 'heart' | 'circle'): void {
    if (this.busy()) return;
    const options = { left: 450, top: 350, originX: 'center' as const, originY: 'center' as const, fill: this.brushColor() };
    if (kind === 'circle') {
      this.addObject(new Circle({ ...options, radius: 70 }));
    } else {
      const path = kind === 'star'
        ? 'M 75 0 L 95 52 L 150 55 L 108 91 L 122 145 L 75 115 L 28 145 L 42 91 L 0 55 L 55 52 Z'
        : 'M 75 140 C 55 120 0 85 0 45 C 0 -10 60 -15 75 25 C 90 -15 150 -10 150 45 C 150 85 95 120 75 140 Z';
      this.addObject(new Path(path, options));
    }
  }

  async uploadImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file || !this.canvas || this.busy()) return;
    this.error.set('');
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      this.error.set('Elige una imagen PNG, JPG o WEBP de hasta 10 MB.');
      return;
    }
    this.busy.set(true);
    const url = URL.createObjectURL(file);
    try {
      const image = await FabricImage.fromURL(url);
      if (this.disposed) return;
      // Store a resized local image so drafts do not depend on temporary blob URLs.
      const source = document.createElement('canvas');
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
      source.width = Math.max(1, Math.round(image.width * scale));
      source.height = Math.max(1, Math.round(image.height * scale));
      source.getContext('2d')!.drawImage(image.getElement(), 0, 0, source.width, source.height);
      const artwork = await FabricImage.fromURL(source.toDataURL('image/png'));
      if (this.disposed) return;
      const bounds = this.rugBounds();
      const fit = Math.min(bounds.width * 0.7 / artwork.width, bounds.height * 0.7 / artwork.height);
      artwork.set({ left: 450, top: 350, originX: 'center', originY: 'center', scaleX: fit, scaleY: fit });
      this.busy.set(false);
      this.addObject(artwork);
      this.message.set('Imagen agregada al boceto.');
    } catch {
      this.error.set('No se pudo abrir esa imagen. Prueba con otro archivo.');
    } finally {
      URL.revokeObjectURL(url);
      this.busy.set(false);
    }
  }

  changeSelectedColor(color: string): void {
    const object = this.canvas?.getActiveObject();
    if (!object || object instanceof FabricImage || this.busy()) return;
    if (object instanceof Path && object.fill === null) object.set('stroke', color);
    else object.set('fill', color);
    this.selectedColor.set(color);
    this.canvas?.requestRenderAll();
    this.record();
  }

  editSelectedText(text: string): void {
    const object = this.canvas?.getActiveObject();
    if (!(object instanceof Textbox) || this.busy()) return;
    object.set('text', text.slice(0, 80));
    this.selectedText.set(text);
    this.canvas?.requestRenderAll();
    this.record();
  }

  async duplicate(): Promise<void> {
    const object = this.canvas?.getActiveObject();
    if (!object || this.busy()) return;
    this.busy.set(true);
    try {
      const copy = await object.clone();
      if (this.disposed) return;
      copy.set({ left: object.left + 24, top: object.top + 24 });
      this.busy.set(false);
      this.addObject(copy);
    } catch {
      this.error.set('No se pudo duplicar el elemento.');
    } finally {
      this.busy.set(false);
    }
  }

  removeSelected(): void {
    if (!this.canvas || this.busy()) return;
    const objects = this.canvas.getActiveObjects();
    this.canvas.discardActiveObject();
    this.canvas.remove(...objects);
    this.record();
  }

  centerSelected(): void {
    const object = this.canvas?.getActiveObject();
    if (!object || this.busy()) return;
    object.setPositionByOrigin(new Point(450, 350), 'center', 'center');
    object.setCoords();
    this.canvas?.requestRenderAll();
    this.record();
  }

  bringForward(): void {
    const object = this.canvas?.getActiveObject();
    if (!object || this.busy()) return;
    this.canvas?.bringObjectForward(object);
    this.record();
  }

  async undo(): Promise<void> { await this.navigateHistory(-1); }
  async redo(): Promise<void> { await this.navigateHistory(1); }

  openReset(): void {
    this.resetConfirm.nativeElement.showModal();
  }

  async reset(): Promise<void> {
    if (!this.canvas || this.busy()) return;
    this.resetConfirm.nativeElement.close();
    this.design.set({ ...DEFAULTS });
    this.canvas.discardActiveObject();
    this.canvas.remove(...this.canvas.getObjects());
    this.setTool('select');
    this.renderRug();
    this.record();
    this.message.set('Nuevo boceto listo.');
  }

  saveDraft(announce = true): void {
    if (!this.canvas || this.busy() || this.disposed) return;
    clearTimeout(this.saveTimer);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.snapshot()));
      this.saved.set(true);
      if (announce) this.message.set('Boceto guardado en este navegador.');
    } catch {
      this.saved.set(false);
      this.error.set('No hay espacio para guardar el boceto en este navegador. Descarga la imagen para conservarlo.');
    }
  }

  download(): void {
    if (!this.canvas || this.busy()) return;
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
    const bounds = this.rugBounds();
    const link = document.createElement('a');
    link.download = `${this.design().name.trim().replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 60) || 'mi-tufting'}.png`;
    link.href = this.canvas.toDataURL({ format: 'png', multiplier: 2, ...bounds });
    link.click();
    this.message.set('Boceto descargado. Puedes adjuntarlo a tu cotizacion.');
  }

  quote(): void {
    if (this.busy()) return;
    const d = this.design();
    const shape = this.shapes.find((item) => item.id === d.shape)?.name;
    const pattern = this.patterns.find((item) => item.id === d.pattern)?.name;
    const text = [
      'Hola, quiero cotizar mi diseno de tufting.',
      `Nombre: ${d.name || 'Mi custom rug'}`, `Forma: ${shape}`,
      `Medidas: ${d.width} x ${d.height} cm`, `Base: ${pattern}`,
      `Colores de base: ${d.baseColor} / ${d.accentColor}`, `Uso: ${d.use}`, `Acabado: ${d.finish}`,
      d.notes.trim() ? `Detalles: ${d.notes.trim()}` : '',
      'Adjuntare el boceto descargado para que revisen el diseno y confirmen el precio.'
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/573046159935?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  private addObject(object: FabricObject): void {
    if (!this.canvas) return;
    this.setTool('select');
    object.set({ cornerColor: '#24142f', cornerStrokeColor: '#ffffff', borderColor: '#24142f', transparentCorners: false, cornerSize: 12 });
    this.canvas.add(object);
    this.canvas.setActiveObject(object);
    this.canvas.requestRenderAll();
    this.record();
  }

  private syncSelection(): void {
    const object = this.canvas?.getActiveObject();
    this.selected.set(!!object);
    this.selectedText.set(object instanceof Textbox ? object.text : null);
    this.colorEditable.set(!!object && !(object instanceof FabricImage));
    this.selectedColor.set(typeof object?.fill === 'string' ? object.fill : this.brushColor());
  }

  private rugBounds(): { left: number; top: number; width: number; height: number } {
    const d = this.design();
    const scale = Math.min(760 / d.width, 540 / d.height);
    const width = d.width * scale;
    const height = d.height * scale;
    return { left: (900 - width) / 2, top: (700 - height) / 2, width, height };
  }

  private renderRug(fitArtwork = false): void {
    if (!this.canvas) return;
    const d = this.design();
    const bounds = this.rugBounds();
    if (fitArtwork && this.base) {
      const old = this.base;
      const ratioX = bounds.width / old.width;
      const ratioY = bounds.height / old.height;
      const scale = Math.min(ratioX, ratioY);
      this.canvas.getObjects().filter((object) => object !== old).forEach((object) => {
        object.set({
          left: bounds.left + (object.left - old.left) * ratioX,
          top: bounds.top + (object.top - old.top) * ratioY,
          scaleX: object.scaleX * scale, scaleY: object.scaleY * scale
        });
        object.setCoords();
      });
    }
    const options = { left: bounds.left, top: bounds.top, originX: 'left' as const, originY: 'top' as const, absolutePositioned: true, strokeWidth: 0 };
    let clip: FabricObject;
    if (d.shape === 'circle' || d.shape === 'oval') {
      clip = new Ellipse({ ...options, rx: bounds.width / 2, ry: bounds.height / 2 });
    } else if (d.shape === 'organic') {
      clip = new Path('M 40 0 C 80 0 100 10 95 40 C 100 70 80 100 50 95 C 20 105 0 80 5 50 C -5 20 15 0 40 0 Z', options);
      clip.set({ scaleX: bounds.width / clip.width, scaleY: bounds.height / clip.height });
    } else {
      clip = new Rect({ ...options, width: bounds.width, height: bounds.height, rx: 14, ry: 14 });
    }
    this.canvas.clipPath = clip;
    if (this.base) this.canvas.remove(this.base);
    this.base = new Rect({ ...bounds, originX: 'left', originY: 'top', strokeWidth: 0, fill: this.patternFill(), selectable: false, evented: false, excludeFromExport: true });
    this.canvas.insertAt(0, this.base);
    this.canvas.requestRenderAll();
  }

  private patternFill(): string | Pattern {
    const d = this.design();
    if (d.pattern === 'plain') return d.baseColor;
    const tile = document.createElement('canvas');
    tile.width = 120;
    tile.height = 120;
    const ctx = tile.getContext('2d')!;
    ctx.fillStyle = d.baseColor;
    ctx.fillRect(0, 0, 120, 120);
    ctx.fillStyle = d.accentColor;
    if (d.pattern === 'checker') {
      ctx.fillRect(0, 0, 60, 60);
      ctx.fillRect(60, 60, 60, 60);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, 25);
      ctx.bezierCurveTo(40, -5, 80, 55, 120, 25);
      ctx.lineTo(120, 85);
      ctx.bezierCurveTo(80, 115, 40, 55, 0, 85);
      ctx.closePath();
      ctx.fill();
    }
    return new Pattern({ source: tile, repeat: 'repeat' });
  }

  private resizeCanvas(): void {
    if (!this.canvas || this.disposed) return;
    const width = this.canvasHost.nativeElement.clientWidth;
    this.canvas.setDimensions({ width: `${width}px`, height: `${width * 700 / 900}px` }, { cssOnly: true });
    this.canvas.calcOffset();
  }

  private snapshot(): Draft {
    return {
      version: 1, settings: { ...this.design() },
      objects: (this.canvas?.getObjects() ?? []).filter((object) => object !== this.base).map((object) => object.toObject())
    };
  }

  private record(persist = true): void {
    if (!this.canvas || this.busy() || this.disposed) return;
    this.objectCount.set(this.canvas.getObjects().filter((object) => object !== this.base).length);
    const snapshot = JSON.stringify(this.snapshot());
    if (snapshot === this.history[this.historyIndex]) return;
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(snapshot);
    if (this.history.length > 30) this.history.shift();
    this.historyIndex = this.history.length - 1;
    this.updateHistoryState();
    if (persist) {
      this.saved.set(false);
      clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => this.saveDraft(false), 500);
    }
  }

  private async restore(draft: Draft): Promise<void> {
    if (!this.canvas) return;
    this.design.set({ ...draft.settings });
    await this.canvas.loadFromJSON({ objects: draft.objects });
    if (this.disposed) return;
    this.base = undefined;
    this.renderRug();
    this.syncSelection();
    this.objectCount.set(draft.objects.length);
  }

  private async navigateHistory(direction: number): Promise<void> {
    const index = this.historyIndex + direction;
    if (this.busy() || index < 0 || index >= this.history.length) return;
    clearTimeout(this.saveTimer);
    this.setTool('select');
    this.busy.set(true);
    try {
      await this.restore(JSON.parse(this.history[index]));
      this.historyIndex = index;
      this.updateHistoryState();
    } catch {
      this.error.set('No se pudo recuperar ese paso del boceto.');
    } finally {
      this.busy.set(false);
      this.saveDraft(false);
    }
  }

  private updateHistoryState(): void {
    this.canUndo.set(this.historyIndex > 0);
    this.canRedo.set(this.historyIndex < this.history.length - 1);
  }

  private validDraft(draft: Draft): boolean {
    const s = draft?.settings;
    return draft?.version === 1 && !!s && Array.isArray(draft.objects)
      && this.shapes.some((item) => item.id === s.shape) && this.patterns.some((item) => item.id === s.pattern)
      && Number.isFinite(s.width) && s.width >= 20 && s.width <= 250
      && Number.isFinite(s.height) && s.height >= 20 && s.height <= 250
      && (s.shape !== 'circle' || s.width === s.height)
      && /^#[\da-f]{6}$/i.test(s.baseColor) && /^#[\da-f]{6}$/i.test(s.accentColor)
      && ['name', 'use', 'finish', 'notes'].every((key) => typeof s[key as keyof DesignSettings] === 'string');
  }
}
