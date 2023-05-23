/**
 * subject: chủ thể - btnEle
 * event: sự kiện - click
 * listener: người nghe - 3 cb
 * dispatch: Gửi
 */

const btnEle = document.querySelector('button')

btnEle.addEventListener('click', () => {
    console.log('run 1')
})

btnEle.addEventListener('click', () => {
    console.log('run 2')
})

const handle = () => {
    console.log('run 3')
}

btnEle.addEventListener('click', handle)

const pEle = document.querySelector('p')
pEle.addEventListener('click', () => {
    console.log('p click')
})