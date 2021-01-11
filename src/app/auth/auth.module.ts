import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from '../theme/theme.module';
import { RegisterComponent } from './register/register.component';
import { ValidateComponent } from './validate/validate.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ValidateComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ThemeModule],
})
export class AuthModule {}
