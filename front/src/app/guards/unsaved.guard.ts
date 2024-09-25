import { ContentObserver } from '@angular/cdk/observers';
import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if(component.hasUnsavedChanges()) {
    return confirm('¿Desea descartar los cambios?');
  }

  return true
};
