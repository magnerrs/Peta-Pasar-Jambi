let editIndex = null;

function loadData() {
  const dataStr = localStorage.getItem('pasarData');
  if (dataStr) {
    try {
      json_pasarjambidata_pasar_tradisional_jambi_1.features = JSON.parse(dataStr);
    } catch (e) {
      console.error("Gagal parsing data dari localStorage:", e);
    }
  }
}

loadData();


function saveData() {
  localStorage.setItem('pasarData', JSON.stringify(json_pasarjambidata_pasar_tradisional_jambi_1.features));
}

function updateDropdownPasar() {
  const select = document.getElementById("infoPasarSelect");
  if (!select) return;


  select.innerHTML = '<option value="">Pilih Pasar</option>';

  json_pasarjambidata_pasar_tradisional_jambi_1.features.forEach(pasar => {
    const namaPasar = pasar.properties["Nama Pasar"];
    const option = document.createElement("option");
    option.value = namaPasar;
    option.textContent = namaPasar;
    select.appendChild(option);
  });
}


function tampilkanListPasar() {
  const listDiv = document.getElementById("listPasar");
  listDiv.innerHTML = "";

  json_pasarjambidata_pasar_tradisional_jambi_1.features.forEach((pasar, index) => {
    const info = pasar.properties;
    listDiv.innerHTML += `
      <div style="border:1px solid #ccc; margin:5px; padding:5px;">
        <b>${info["Nama Pasar"]}</b><br>
        ${info["Alamat Pasar"]} (${info["Kecamatan"]})<br>
        Lat: ${info["Latitude"]}, Long: ${info["Longitude"]}
        <br>
        <button onclick="showEditForm(${index})">Edit</button>
        <button onclick="hapusPasar(${index})">Hapus</button>
      </div>
    `;
  });

  updateDropdownPasar();
}


function showAddForm() {
  editIndex = null;
  document.getElementById("formPasar").style.display = "block";

  document.getElementById("namaPasar").value = "";
  document.getElementById("alamatPasar").value = "";
  document.getElementById("kecamatanPasar").value = "";
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
}

function showEditForm(index) {
  editIndex = index;
  const pasar = json_pasarjambidata_pasar_tradisional_jambi_1.features[index];
  const info = pasar.properties;

  document.getElementById("formPasar").style.display = "block";
  document.getElementById("namaPasar").value = info["Nama Pasar"];
  document.getElementById("alamatPasar").value = info["Alamat Pasar"];
  document.getElementById("kecamatanPasar").value = info["Kecamatan"];
  document.getElementById("latitude").value = info["Latitude"];
  document.getElementById("longitude").value = info["Longitude"];

  editIndex = index;
  document.getElementById("formPasar").style.display = "block";
}

function tambahAtauEditPasar() {
  const nama = document.getElementById("namaPasar").value;
  const alamat = document.getElementById("alamatPasar").value;
  const kecamatan = document.getElementById("kecamatanPasar").value;
  const lat = parseFloat(document.getElementById("latitude").value);
  const lng = parseFloat(document.getElementById("longitude").value);

  if (!nama || !alamat || !kecamatan || isNaN(lat) || isNaN(lng)) {
    alert("Mohon isi semua field dengan benar");
    return;
  }

  if (editIndex === null) {
    // tambah pasar baru
    const newPasar = {
      type: "Feature",
      properties: {
        fid: (json_pasarjambidata_pasar_tradisional_jambi_1.features.length + 1).toString(),
        No: json_pasarjambidata_pasar_tradisional_jambi_1.features.length + 1,
        "Nama Pasar": nama,
        "Latitude": lat,
        "Longitude": lng,
        "Jenis Pasar": "Pasar Rakyat",
        "Alamat Pasar": alamat,
        "Kecamatan": kecamatan
      },
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      }
    };
    json_pasarjambidata_pasar_tradisional_jambi_1.features.push(newPasar);
    
  } else {
    // edit pasar
    const pasar = json_pasarjambidata_pasar_tradisional_jambi_1.features[editIndex];
    pasar.properties["Nama Pasar"] = nama;
    pasar.properties["Alamat Pasar"] = alamat;
    pasar.properties["Kecamatan"] = kecamatan;
    pasar.properties["Latitude"] = lat;
    pasar.properties["Longitude"] = lng;
    pasar.geometry.coordinates = [lng, lat];
  }

  editIndex = null;

  // reset form
  document.getElementById("namaPasar").value = "";
  document.getElementById("alamatPasar").value = "";
  document.getElementById("kecamatanPasar").value = "";
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";

  document.getElementById("formPasar").style.display = "none";
  tampilkanListPasar();

  saveData();

  if (typeof refreshMarkers === "function") {
    refreshMarkers();
  }
}


function hapusPasar(index) {
  json_pasarjambidata_pasar_tradisional_jambi_1.features.splice(index, 1);
  tampilkanListPasar();

  saveData();

  if (typeof refreshMarkers === "function") {
    refreshMarkers();
  }
}


loadData();
tampilkanListPasar();
updateDropdownPasar();
