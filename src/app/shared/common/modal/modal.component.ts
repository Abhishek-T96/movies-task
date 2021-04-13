import { 
  AfterViewInit, 
  Component, 
  ContentChild, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnInit, 
  Renderer2, 
  TemplateRef, 
  ViewChild, 
} from '@angular/core';
import { ModalBodyTemplate, ModalHeaderTemplate } from './modal.directives';

@Component({
  selector: 'movies-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ContentChild(ModalBodyTemplate, { static: false, read: TemplateRef }) 
  modalBodyTemplate: TemplateRef<any>;
  @ContentChild(ModalHeaderTemplate, { static: false, read: TemplateRef }) 
  modalHeaderTemplate: TemplateRef<any>;

  @ViewChild('wrapperElem', { read: ElementRef, static: false })
  private _wrapperElem: ElementRef;

  @ViewChild('modalContent', { read: ElementRef, static: false })
  private _modalContent: ElementRef;
  
  @Input()
  closeCb: EventEmitter<any> = new EventEmitter<any>();

  private _bodyElem;

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._bodyElem = document.getElementsByTagName('body')[0];
  }

  openModal(): void {
    this._renderer.removeClass(this._modalContent.nativeElement, 'scaleOut');
    this._renderer.addClass(this._modalContent.nativeElement, 'scaleIn');
    this._renderer.addClass(this._bodyElem, 'modal-open');
    this._bodyElem.appendChild(this._wrapperElem.nativeElement);
  }

  _closeModal(): void {
    this._renderer.removeClass(this._modalContent.nativeElement, 'scaleIn');
    this._renderer.addClass(this._modalContent.nativeElement, 'scaleOut');
    this._renderer.removeClass(this._bodyElem, 'modal-open');
    setTimeout(() => {
      this._bodyElem.removeChild(this._wrapperElem.nativeElement);
      this.closeCb.emit();
    },300);
  }

}
