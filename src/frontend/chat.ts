const socket = (window as any).io();

interface MessageChat{
    data: any
}

class Chat {
    static io: any;
    static user: any;

    constructor(private cb : Function){
        Chat.io.on('dataFromServer',this.cb);
    }
    emmitMensajes(user: string, message : string){
        let data = {user,message}
        Chat.io.emit('data',data)
    }
}

Chat.io = socket;

function chats (chat: Chat){
    let arregloChats : Chat[] = [];
    arregloChats.push(chat);
}

function mensajeRecibido(response: MessageChat){
    /* Creacion de listado de mensajes a traves del DOM */
    let abuelo = document.querySelector("#messages");
    let padre = document.createElement("li");
    let child1 = document.createElement("span");
    child1.innerHTML = response.data.user;
    child1.style.fontStyle = 'italic';
    child1.style.fontWeight = '700';
    let child2 = document.createElement("p");
    child2.innerHTML = response.data.message;
    padre.appendChild(child1);
    padre.appendChild(child2);
    padre.style.listStyle = 'none';
    padre.style.backgroundColor = 'cornflowerblue';
    padre.style.borderRadius = '0 10px 10px 10px';
    padre.style.padding = '10px';
    padre.style.margin = '5px';
    abuelo.appendChild(padre);
}

let chat : Chat = new Chat(mensajeRecibido);

document.querySelector("#form").addEventListener('submit',(ev)=>{
    ev.preventDefault();
    const user: string = (document.querySelector("#user") as HTMLInputElement).value;
    const message: string = (document.querySelector("#message") as HTMLInputElement).value;
    chat.emmitMensajes(user,message);

    return false; 
})