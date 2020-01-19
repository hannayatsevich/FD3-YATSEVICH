'use strict';

import {EventEmitter} from 'events';

let mobileEvents = new EventEmitter();
//событие EDeleteClient - MobileClient - MobileCompamny (удалить клиента)
//событие EEditClient - MobileClient - MobileCompamny (редактировать клиента)
//событие ESaveClient - MobileClientCard - MobileCompamny (сохранить редактируемого или нового клиента)
//событие ECloseCard - MobileClientCard - MobileCompamny (закрыть карточку без сохранения)

export {mobileEvents};