import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  public message:string='';
  public messages:string[]=[];

  constructor(private chatService :ChatService) { }
  ngOnInit(): void {
    this.listMessage();
  }

  public sendMessage(){
    console.log('oooooooooooo');
    
     this.chatService.sendMessage(this.message);
     this.messages.push(this.message);
     this.message=''
  }
  public listMessage(){
    return this.chatService.listMessage().subscribe((data:any)=>{
      console.log("recieved:",data);
      
      this.messages.push(data);
    });
  }

  
  

  

}
