import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, Route, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  #router = inject(Router);

  navItems = this.#router.config
    .filter((r: Route) => r.data?.['label'])
    .map((r: Route) => ({
      path: '/' + r.path,
      label: r.data?.['label'],
      icon: r.data?.['icon'],
    }));
}
