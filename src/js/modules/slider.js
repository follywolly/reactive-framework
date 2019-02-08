const slider = () => {
  document.querySelector('button').addEventListener('click', () => {
    const all = document.querySelectorAll('.painting-group')
    const selected = document.querySelector('.painting-group.active')
    const elReset = e => {
      e.target.classList.remove('active-out')
      e.target.removeEventListener('transitionend', elReset)
    }
    all.forEach((element, index) => {
      if (element === selected) {
        selected.classList.remove('active')
        selected.addEventListener('transitionend', elReset)
        selected.classList.add('active-out')
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
