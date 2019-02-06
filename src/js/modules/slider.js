const slider = () => {
  document.querySelector('button').addEventListener('click', () => {
    const all = document.querySelectorAll('.painting-group')
    const selected = document.querySelector('.painting-group.active')
    all.forEach((element, index) => {
      if (element === selected) {
        selected.classList.remove('active')
        selected.classList.add('active-out')
        setTimeout(()=>selected.classList.remove('active-out'), 1000)
        if (all[index + 1]) {
          all[index + 1].classList.add('active')
        } else {
          all[0].classList.add('active')
        }
      }
    })
  })
}

export default slider
