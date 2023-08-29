import {io} from 'socket.io-client'

const joinRoombutton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const form = document.getElementById('form')

const socket = io('http://localhost:3000')
socket.on('connect',()=>{
    displayMessage(`You connected with id : ${socket.id}`)
})

socket.on('receive-message',(message)=>{
    displayMessage(message)
})

//to server
// socket.emit('custom-event','Another Argument')

form.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    const room = roomInput.value
    
    if(message !== ""){
        displayMessage(message)
        socket.emit('send-message',message,room)
    }else{
        return
    }
    messageInput.value = ""
})

joinRoombutton.addEventListener('click',()=>{
    const room = roomInput.value
    socket.emit('join-room',room,(msg)=>{
        displayMessage(msg)
    })
})

function displayMessage(message){
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById('message-container').append(div)
}