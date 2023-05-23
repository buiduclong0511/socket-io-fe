const socketClient = io("http://127.0.0.1:3000"); 

// Lấy tên của user
let username = ''
// Lặp lại việc lấy tên của user nếu user nhập toàn dấu cách hoặc bấm cancel
while(!username || !username.trim()) {
    // Show form nhập tên
    username = window.prompt('Tên của bạn là gì?')
}

const sendBtnEle = document.querySelector('.send-btn')
const inputEle = document.querySelector('.message-input')
// Ràng buộc listener cho event click của send button
sendBtnEle.addEventListener('click', () => {
    const content = inputEle.value.trim()
    // Không làm gì nếu chưa nhập content
    if (!content) {
        return
    }

    // Dispatch 1 event client_send_message gửi kèm theo message và username
    socketClient.emit('client_send_message', {
        message: content,
        username
    })

    // clear input
    inputEle.value = ''
})

// Lắng nghe sự kiện server_send_message từ phía server 
socketClient.on('server_send_message', (data) => {
    // Lấy ul element
    const messageList = document.querySelector('.message-list')
    // Tạo li element
    const messageItemEle = document.createElement('li')
    // Tạo strong element để hiển thị tên
    const nameEle = document.createElement('strong')
    // Tạo span element để hiển thị message
    const contentEle = document.createElement('span')
    // Gắn tên user vào nội dung của strong element
    nameEle.innerText = `${data.username}: `
    // Gắn message vào nội dung của span element
    contentEle.innerText = data.message
    // Thêm thẻ strong vào li
    messageItemEle.appendChild(nameEle)
    // Thêm thẻ span vào li
    messageItemEle.appendChild(contentEle)
    // Thêm li vào ul
    messageList.appendChild(messageItemEle)
})

// Lắng nghe sự kiện server_send_current_messages để lấy các messages hiện tại khi mới vào
socketClient.on('server_send_current_messages', (data) => {
    // Tạo danh sách các thẻ li
    const liEles = data.map(item => {
        // Tương tự các bước trên
        const element = document.createElement('li')
        const nameEle = document.createElement('strong')
        const contentEle = document.createElement('span')
        nameEle.innerText = `${item.username}: `
        contentEle.innerText = `${item.message}`
        element.appendChild(nameEle)
        element.appendChild(contentEle)

        return element
    })

    // Lấy ul element
    const ulEle = document.querySelector('.message-list')
    // Lặp qua danh sách các thẻ li vừa tạo và append vào ul element
    liEles.forEach(element => ulEle.appendChild(element))
})
