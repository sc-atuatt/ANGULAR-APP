import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { }

  public sendMessage(message:string){
    console.log(message);
    
    this.socket.emit('message', message);

  }
  public listMessage():Observable<any>{
    return this.socket.fromEvent('received').pipe(map(data=>data));
  }

}
