import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ConnectionStatus, NetworkService } from './services/network.service';
import { OfflineManagerService } from './services/offline-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready().then(() => {
        this.networkService
          .onNetworkChange()
          .subscribe((status: ConnectionStatus) => {
            if (status == ConnectionStatus.Online) {
              this.offlineManager.checkForEvents().subscribe();
            }
          });
      });
  }
}
