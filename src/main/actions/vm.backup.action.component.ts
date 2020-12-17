import { Component } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EntityActionExtensionComponent, EntityActionExtensionMenuEntry } from "@vcd/sdk/common";

@Component({
    selector: 'vm-backup-action-extension',
    templateUrl: './vm.backup.action.component.html'
})
export class VmBackupActionComponent extends EntityActionExtensionComponent {
    modalText = "";
    opened = false;

    private result: Subject<{ refreshRequested: boolean }>;

    getMenuEntry(entityUrn: string): Observable<EntityActionExtensionMenuEntry> {
        return Observable.of({
           text: "Add Services",
            children: [{
                urn: "urn:vmware:vcloud:vapp:addOsAdmin",
                text: "Add OS Admin",
                busy: false,
                enabled: true
            },
            {
                urn: "urn:vmware:vcloud:vapp:addMonitoring",
                text: "Add Monitoring",
                busy: false,
                enabled: true
            },
            {
                urn: "urn:vmware:vcloud:vapp:addPatching",
                text: "Add Patching",
                busy: false,
                enabled: true
            },
            {
                urn: "urn:vmware:vcloud:vapp:addAntivirus",
                text: "Add Anti-Virus",
                busy: false,
                enabled: true
            },
            {
                urn: "urn:vmware:vcloud:vapp:addBackup",
                text: "Add Backups",
                busy: false,
                enabled: true
            }]
        });
    }

    performAction(menuItemUrn: string, entityUrn: string): Observable<{ refreshRequested: boolean }> {
        this.modalText = `Entity: ${entityUrn}  Action: ${menuItemUrn}`;
        this.opened = true;
        this.result = new Subject<{ refreshRequested: boolean }>();
        return this.result.asObservable();
    }

    onClose() {
        this.opened = false;
        this.result.next({ refreshRequested: true });
        this.result.complete();
    }

}