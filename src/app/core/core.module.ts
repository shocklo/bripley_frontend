import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

const CORE_MODULE_EXPORTS = [
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
];

export const tokenGetter = () => {
  return localStorage.getItem('token');
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['192.168.0.7:3000', 'cristobalalegria.cl'],
        disallowedRoutes: [],
      },
    }),
    ...CORE_MODULE_EXPORTS,
  ],
  exports: [...CORE_MODULE_EXPORTS],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: { duration: 2500 },
        },
      ],
    };
  }
}
