let btns = document.querySelectorAll('button.formulario-item--btn--eliminar')

const eliminar_producto = (e) => {
	let valor = e.target.parentNode.querySelector('input[name="id"]').value
	let csrf = e.target.parentNode.querySelector('input[name="_csrf"]').value
    
    
	fetch('eliminar/' + valor, {
        method: 'DELETE',
        headers:{
            'csrf-token':csrf
        }
	})
		.then((result) => {
            e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
            
		})
		.catch((err) => {
			console.log(err)
		})
}
btns.forEach((i) => i.addEventListener('click', eliminar_producto))
