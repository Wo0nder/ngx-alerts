import {inject, TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {Alert} from '../model/alert.model';
import {ALERT_CONFIG} from '../alert.config';

describe('AlertService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertService,
                {provide: ALERT_CONFIG, useValue: {maxMessages: 5, timeout: 5000}}
            ]
        });
    });

    it('should be created', inject([AlertService], (service: AlertService) => {
        expect(service).toBeTruthy();
    }));

    it('should create info alert', inject([AlertService], (service: AlertService) => {
        const result: Alert[] = [{
            content: 'info',
            type: 'info'
        }];

        service.info('info');

        service.messages.subscribe(msg => {
            expect(msg).toEqual(result);
        });
    }));

    it('should create success alert', inject([AlertService], (service: AlertService) => {
        const result: Alert[] = [{
            content: 'success',
            type: 'success'
        }];

        service.success('success');

        service.messages.subscribe(msg => {
            expect(msg).toEqual(result);
        });
    }));

    it('should create warning alert', inject([AlertService], (service: AlertService) => {
        const result: Alert[] = [{
            content: 'warning',
            type: 'warning'
        }];

        service.warning('warning');

        service.messages.subscribe(msg => {
            expect(msg).toEqual(result);
        });
    }));

    it('should create danger alert', inject([AlertService], (service: AlertService) => {
        const result: Alert[] = [{
            content: 'danger',
            type: 'danger'
        }];

        service.danger('danger');

        service.messages.subscribe(msg => {
            expect(msg).toEqual(result);
        });
    }));
    
    it('should pop last alert', inject([AlertService], (service: AlertService) => {
    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');
    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');

    service.messages.take(1).subscribe(msgs => {
      console.log(msgs);
      expect(msgs.length).toEqual(5);
    });
  }));

  it('should close alert', inject([AlertService], (service: AlertService) => {
    const result: Alert[] = [
      {
        content: 'danger',
        type: 'warning'
      }, {
        content: 'danger',
        type: 'info'
      }, {
        content: 'danger',
        type: 'danger'
      }
    ];

    service.danger('danger');
    service.info('danger');
    service.warning('danger');
    service.success('danger');

    service.messages
      .take(1)
      .subscribe(msgs => {
        service.close(msgs[0]);

        service.messages
          .take(1)
          .subscribe(msgs => {
            expect(msgs).toEqual(result);
          });
      });
  }));
});
