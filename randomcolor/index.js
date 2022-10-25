const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e)=>{
    e.preventDefault()
    if (e.code.toLocaleLowerCase() === 'space') {
        setRandomColors()
        
    }
})

document.addEventListener('click', (e) =>{
    const type = e.target.dataset.type
    if (type === 'lock') {
        
        const node = e.target.tagName.toLocaleLowerCase() === 'i' ? e.target : e.target.children[0]
        node.classList.toggle('fa-lock')
        node.classList.toggle('fa-lock-open')
    }else if(type === 'copy'){
        copytoo(e.target.textContent)
    }
})
const randomColor = () =>{
    const codes = '1234567890ABCDEF';
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += codes[Math.floor(Math.random() * codes.length)]
        
    }
    return '#' + color
}
const copytoo = (text) =>{
    navigator.clipboard.writeText(text)
}
const setRandomColors = (isInitials) =>{
    const colors = isInitials ? saveHash() : []
    cols.forEach(col =>{
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        
        if (isLocked) {
            colors.push(text.textContent)
            return
         }
         const color = isInitials ? colors[index]: randomColor()
         if (!isInitials) {
            colors.push(color)
         }
         

        text.textContent = color
        col.style.background = color
         
        setTextColor(text, color);
        setTextColor(button, color);
    })
    saveHash(colors)
}

const setTextColor = (text, color) =>{
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5  ?'black' : 'white'
}
 const saveHash = (colors = []) =>{
    document.location.hash = colors.map(col =>{return col.substring(1)}).join('-')
    console.log(colors)
 }
 
setRandomColors()