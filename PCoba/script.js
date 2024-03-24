fetch('https://crudcrud.com/api/15a27230651c40e9ab11294f95828db9/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'User 1',
        avatar: 'images/image1.jpg' // Menyertakan URL gambar di sini
    })
})
.then(res => {
    return res.json();
})
.then(data => {
    // Simpan ID atau kunci unik dari data yang baru ditambahkan
    const userId = data._id; // Anda perlu menyesuaikan properti yang sesuai dengan respons data Anda

    // Setelah menyimpan ID, Anda bisa menggunakannya untuk melakukan pengeditan
    fetch(`https://crudcrud.com/api/15a27230651c40e9ab11294f95828db9/user/${userId}`, {
        method: 'PUT', // atau PATCH tergantung pada kebijakan CRUD Anda
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'New Name', // Ubah sesuai kebutuhan Anda
            email: 'newemail@example.com' // Ubah sesuai kebutuhan Anda
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log('Data updated successfully:', data);
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
})
.catch(error => {
    console.log('ERROR:', error);
});
