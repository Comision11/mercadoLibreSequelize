console.log('editProduct.js success');

const showPreview = array => {
    const preview = document.getElementById('preview');
    preview.innerHTML = null;
    array.forEach(image => {
        preview.innerHTML += `
        <div class="col-6">
          <img class="img-fluid" src="/images/products/${image.file}" alt="">
            <div class="text-center">
              <button onclick="deleteImage('${image.id}')" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
        </div>
        `
      });
  }


const deleteImage = async id => {
    try {
      let response = await fetch('/api/products/delete-image/' + id)
      let result = await response.json()
     
      showPreview(result.images)
    } catch (error) {
      console.log(error)
    }
  }

  const addImage = async (id,files) => {
    var data = new FormData()
      for (const file of files) {
        data.append('images',file,file.name)
      } 
      console.log(data)
    try {
     
      let response = await fetch('/api/products/add-images/' + id,{
        method : 'POST',
        body : data,
      })
      let result = await response.json()
      console.log(result.message)
      showPreview(result.images)
     
    } catch (error) {
      console.log(error)
    }
  }