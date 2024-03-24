let editedUnicornId = null; // Menyimpan ID dari item yang sedang diedit

// Fungsi untuk menambahkan atau memperbarui data
function addOrUpdateUnicorn() {
    const nama = document.getElementById('unicornNamaInput').value;
    const harga = document.getElementById('unicornHargaInput').value;
    const selectedImage = document.getElementById('imageSelect').value;
    const newUnicorn = {
        nama: nama,
        harga: harga,
        image: selectedImage
    };

    let url = 'https://crudcrud.com/api/3d5dceadb24546d3af36359bca8c0213/unicorns/';
    let method = 'POST'; // Default method adalah POST untuk menambah data baru

    if (editedUnicornId) {
        // Jika sedang dalam mode edit, gunakan method PUT untuk memperbarui data yang ada
        url += editedUnicornId;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUnicorn),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data berhasil disimpan:', data);
        // Reset nilai input setelah berhasil menyimpan data
        document.getElementById('unicornNamaInput').value = '';
        document.getElementById('unicornHargaInput').value = '';
        editedUnicornId = null; // Reset editedUnicornId setelah operasi selesai
        document.getElementById('addUnicornButton').innerText = 'Tambah Data'; // Ubah teks tombol menjadi "Tambah Data"
        showUnicornData(); // Panggil kembali fungsi untuk menampilkan data terbaru
    })
    .catch((error) => {
        console.error('Terjadi kesalahan:', error);
    });
}

// Fungsi untuk mengisi nilai input saat tombol "Edit" diklik
function editUnicorn(nama, harga, id) {
    document.getElementById('unicornNamaInput').value = nama;
    document.getElementById('unicornHargaInput').value = harga;
    editedUnicornId = id; // Simpan ID dari item yang diedit
    document.getElementById('addUnicornButton').innerText = 'Simpan Data'; // Ubah teks tombol menjadi "Simpan Data"
}

// Fungsi untuk menghapus data
function deleteUnicorn(id) {
    fetch(`https://crudcrud.com/api/3d5dceadb24546d3af36359bca8c0213/unicorns/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Data dengan ID', id, 'telah dihapus');
            // Setelah menghapus data, panggil kembali fungsi untuk menampilkan data
            showUnicornData();
        } else {
            console.error('Gagal menghapus data');
        }
    })
    .catch((error) => {
        console.error('Terjadi kesalahan:', error);
    });
}

// Fungsi untuk menampilkan data unicorn
function showUnicornData() {
    fetch('https://crudcrud.com/api/3d5dceadb24546d3af36359bca8c0213/unicorns/')
    .then(response => response.json())
    .then(data => {
        let unicornDataElement = document.getElementById('unicornData');
        unicornDataElement.innerHTML = ''; // Kosongkan div sebelum menambahkan data yang baru
        data.forEach(unicorn => {
            let productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div>nama: ${unicorn.nama}</div>
                <div>harga: ${unicorn.harga}</div>
                <div><img src="${unicorn.image}" alt="Unicorn Image" width="150" height="150"></div>
                <button onclick="editUnicorn('${unicorn.nama}', '${unicorn.harga}', '${unicorn._id}')">Edit</button>
                <button onclick="deleteUnicorn('${unicorn._id}')">Hapus Data</button>
            `;
            unicornDataElement.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
}

// Event listener untuk tombol "Tambah Data" atau "Simpan Data"
document.getElementById('addUnicornButton').addEventListener('click', addOrUpdateUnicorn);

// Event listener untuk tombol "Kosongkan Data"
document.getElementById('clearUnicornButton').addEventListener('click', () => {
    // Membersihkan nilai input
    document.getElementById('unicornNamaInput').value = '';
    document.getElementById('unicornHargaInput').value = '';
});

// Saat halaman dimuat, panggil fungsi untuk menampilkan data
showUnicornData();
