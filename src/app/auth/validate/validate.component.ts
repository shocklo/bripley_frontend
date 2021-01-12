import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent implements OnInit {
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id_user && params.code) {
        this.usersService
          .validate(params.id_user, params.code)
          .then((res) => {            
            this.snackBar.open(res.message);
            this.router.navigate(['/', 'auth', 'login']);
          })
          .catch((e) => {
            this.errorMessage = e.error.message;
          });
      }
    });
  }

  ngOnInit(): void {}
}
