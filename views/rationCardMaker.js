
function RationCardMaker() {
return `
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Premium PVC Card Maker | Apna Work</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 24px 12px;
  font-family: Arial, sans-serif;
  background: #edf2f8;
  color: #14243b;
}

.wrap {
  max-width: 1100px;
  margin: auto;
}

.page-title {
  text-align: center;
  font-size: 27px;
  margin: 0 0 6px;
  color: #102c52;
}

.subtitle {
  text-align: center;
  font-size: 13px;
  color: #65758a;
  margin-bottom: 25px;
}

.form {
  background: #fff;
  border: 1px solid #dbe3ed;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 30px #1b365315;
}

.form h3 {
  color: #16375a;
  border-bottom: 2px solid #d6aa54;
  padding-bottom: 12px;
  margin: 0 0 19px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 15px 20px;
}

.field label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 7px;
  color: #34455b;
}

.field input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  background: #fcfdff;
}

.field input:focus {
  border-color: #c89d45;
  box-shadow: 0 0 0 3px #d6aa5428;
}

.actions {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  border: none;
  padding: 13px 22px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.print-btn {
  background: linear-gradient(135deg,#153c68,#09203c);
  color: #fff;
}

.reset-btn {
  background: #e7edf5;
  color: #334155;
}

.note {
  margin-top: 17px;
  font-size: 12px;
  line-height: 1.7;
  color: #64748b;
}

.preview-title {
  text-align: center;
  font-size: 20px;
  margin: 26px 0 16px;
}

.sheet-holder {
  overflow-x: auto;
}

.sheet {
  width: 210mm;
  height: 297mm;
  padding: 15mm 10mm;
  margin: auto;
  background: #fff;
  box-shadow: 0 8px 30px #0002;
}

.cards {
  width: 190mm;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* STANDARD PVC */
.pvc-card {
  position: relative;
  width: 86mm;
  height: 54mm;
  flex: 0 0 86mm;
  overflow: hidden;
  border-radius: 3mm;
  border: 0.3mm solid #17314d;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* FRONT SIDE */
.front {
  background: linear-gradient(
    145deg,
    #fafdff 0%,
    #e1eef8 65%,
    #c3d6e5 100%
  );
}

.front-top {
  background: linear-gradient(
    120deg,
    #082541,
    #164c7b,
    #092946
  );
  height: 12mm;
  text-align: center;
  padding-top: 1.5mm;
  border-bottom: 0.8mm solid #d7ae5a;
}

.front-top h2 {
  margin: 0;
  color: #f4d58d;
  font-family: Georgia,serif;
  font-size: 15px;
  letter-spacing: 1px;
}

.front-top small {
  color: #d6e4f0;
  font-size: 6px;
  letter-spacing: 0.5px;
}

.front-content {
  padding: 2.5mm 3mm 1mm;
}

.front-row {
  display: flex;
  gap: 2mm;
}

.front-info {
  flex: 1;
  min-width: 0;
}

.info-line {
  margin-bottom: 1.35mm;
  font-size: 8px;
  line-height: 1.17;
  overflow-wrap: anywhere;
}

.info-label {
  display: block;
  color: #526779;
  font-size: 6px;
  font-weight: bold;
  margin-bottom: 0.3mm;
}

.info-value {
  display: block;
  font-size: 8px;
  font-weight: 800;
  color: #102944;
}

.photo-box {
  width: 18mm;
  height: 22mm;
  flex-shrink: 0;
  border: 1.5px solid #bc964a;
  background: #fff;
  border-radius: 1mm;
  overflow: hidden;
}

.photo-box img {
  width: 100%;
  height: 100%;
  display: none;
  object-fit: cover;
}

.photo-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #789;
  font-size: 8px;
}

.front-bottom {
  margin-top: 1.5mm;
  border-top: 1px solid #b2c4d4;
  padding-top: 1.5mm;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2mm;
  row-gap: 1mm;
}

.front-bottom .info-line {
  margin: 0;
}

.front-bottom .wide {
  grid-column: 1 / -1;
}

.front-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #123452;
  color: #e2e8f0;
  padding: 1.1mm 3mm;
  font-size: 5.5px;
  display: flex;
  justify-content: space-between;
}

/* PREMIUM BACK SIDE */
.back {
  background: linear-gradient(
    145deg,
    #071b32,
    #133e63 55%,
    #061a31
  );
  border: 0.35mm solid #cfa85b;
  color: #fff;
  padding: 2mm;
}

.back-frame {
  height: 100%;
  width: 100%;
  border: 0.25mm solid #d4ad63;
  border-radius: 2mm;
  padding: 1.7mm 2.5mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.6mm;
  text-align: center;
  overflow: hidden;
}

.back-brand {
  font-family: Georgia,serif;
  font-size: 15px;
  line-height: 1.1;
  font-weight: bold;
  letter-spacing: 0.6px;
  color: #f2d18a;
  margin: 0;
}

.back-tagline {
  font-size: 7px;
  color: #e0ebf4;
  margin: 0;
  line-height: 1.2;
}

.gold-divider {
  width: 70%;
  height: 0.25mm;
  background: #cfa85b;
  flex-shrink: 0;
}

.back-heading {
  margin: 0;
  font-size: 8.5px;
  font-weight: bold;
  color: #ffe2a0;
  line-height: 1.2;
}

.back-sub {
  margin: 0;
  max-width: 100%;
  font-size: 7px;
  color: #fff;
  line-height: 1.25;
}

.contact-bar {
  width: 95%;
  border: 1px solid #c8a45e;
  border-radius: 2mm;
  padding: 1mm 2mm;
  background: #081c32;
  font-size: 10px;
  font-weight: bold;
  color: #ffe3a0;
  line-height: 1.15;
  white-space: nowrap;
}

.services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 1mm 2mm;
  text-align: left;
  font-size: 7.5px;
  font-weight: 700;
  color: #f2f6fc;
  line-height: 1.2;
}

.services span {
  padding: 0.5mm;
}

.back-footer {
  color: #f1d18a;
  font-size: 7px;
  line-height: 1.2;
  font-weight: bold;
  margin: 0;
}

.back-disclaimer {
  font-size: 5.4px;
  color: #b7c6d4;
  margin: 0;
}

/* MOBILE */
@media(max-width:900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .form {
    padding: 17px;
  }

  .page-title {
    font-size: 22px;
  }
}

/* A4 PRINT */
@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
  }

  .form,
  .page-title,
  .subtitle,
  .preview-title {
    display: none !important;
  }

  .wrap {
    max-width: none;
    margin: 0;
  }

  .sheet-holder {
    overflow: visible;
  }

  .sheet {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 15mm 10mm;
    box-shadow: none;
    page-break-after: avoid;
  }

  .pvc-card,
  .front,
  .back,
  .front-top,
  .front-footer,
  .back-frame,
  .contact-bar {
    print-color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
  }
}
</style>
</head>

<body>
<div class="wrap">

<h1 class="page-title">
  Premium PVC Card Maker
</h1>

<p class="subtitle">
  APNA WORK | Professional Personal Card Printing
</p>

<div class="form">

<h3>कार्ड की जानकारी भरें</h3>

<div class="grid">

<div class="field">
<label>पहला Head of Family</label>
<input id="name1" placeholder="Enter Name">
</div>

<div class="field">
<label>Mobile Number</label>
<input id="mobile"
       maxlength="10"
       inputmode="numeric"
       placeholder="Enter Mobile Number">
</div>

<div class="field">
<label>पहला Ration Card Number</label>
<input id="ration1"
       placeholder="Enter Ration Card Number">
</div>

<div class="field">
<label>पहला Aadhaar Number</label>
<input id="aadhaar1"
       maxlength="12"
       inputmode="numeric"
       placeholder="12 Digit Aadhaar">
</div>

<div class="field">
<label>दूसरा Head of Family</label>
<input id="name2"
       placeholder="Enter Second Name">
</div>

<div class="field">
<label>दूसरा Ration Card Number</label>
<input id="ration2"
       placeholder="Enter Second Ration Card Number">
</div>

<div class="field">
<label>दूसरा Aadhaar Number</label>
<input id="aadhaar2"
       maxlength="12"
       inputmode="numeric"
       placeholder="12 Digit Aadhaar">
</div>

<div class="field">
<label>फोटो अपलोड करें</label>
<input id="photoInput"
       type="file"
       accept="image/*">
</div>

<div class="field">
<label>Shop Name</label>
<input id="shopName" value="APNA WORK">
</div>

<div class="field">
<label>Shop Contact Number</label>
<input id="shopMobile"
       value="9142264714"
       maxlength="10"
       inputmode="numeric">
</div>

</div>

<div class="actions">

<button class="print-btn"
        type="button"
        onclick="window.print()">
  🖨 Print / Save PDF
</button>

<button class="reset-btn"
        type="button"
        onclick="resetFields()">
  Reset Form
</button>

</div>

<p class="note">
  A4 Portrait | PVC 86 × 54mm |
  Print Scale 100% | Background Graphics ON
</p>

</div>

<h3 class="preview-title">
  A4 Premium Print Preview
</h3>

<div class="sheet-holder">
<div class="sheet">
<div class="cards">

<!-- FRONT CARD -->
<div class="pvc-card front">

<div class="front-top">
<h2>RATION CARD</h2>
<small>PERSONAL REFERENCE CARD</small>
</div>

<div class="front-content">

<div class="front-row">

<div class="front-info">

<div class="info-line">
<span class="info-label">HEAD OF FAMILY</span>
<span class="info-value" id="vname1">—</span>
</div>

<div class="info-line">
<span class="info-label">MOBILE NUMBER</span>
<span class="info-value" id="vmobile">—</span>
</div>

<div class="info-line">
<span class="info-label">RATION CARD NUMBER</span>
<span class="info-value" id="vration1">—</span>
</div>

<div class="info-line">
<span class="info-label">AADHAAR NUMBER</span>
<span class="info-value" id="vaadhaar1">—</span>
</div>

</div>

<div class="photo-box">
<img id="vphoto" alt="Holder Photo">
<div class="photo-placeholder" id="photoPlaceholder">
PHOTO
</div>
</div>

</div>

<div class="front-bottom">

<div class="info-line">
<span class="info-label">SECOND FAMILY HEAD</span>
<span class="info-value" id="vname2">—</span>
</div>

<div class="info-line">
<span class="info-label">AADHAAR NUMBER</span>
<span class="info-value" id="vaadhaar2">—</span>
</div>

<div class="info-line wide">
<span class="info-label">RATION CARD NUMBER</span>
<span class="info-value" id="vration2">—</span>
</div>

</div>

</div>

<div class="front-footer">
<span>PERSONAL REFERENCE COPY</span>
<span>Not a Government-Issued Card</span>
</div>

</div>

<!-- BACK CARD -->
<div class="pvc-card back">

<div class="back-frame">

<h2 class="back-brand" id="vshopName">
APNA WORK
</h2>

<p class="back-tagline">
Premium PVC Card Printing Service
</p>

<div class="gold-divider"></div>

<p class="back-heading">
आपका भरोसा, हमारी पहचान
</p>

<p class="back-sub">
शानदार डिजाइन और बेहतरीन फिनिश के साथ
अपना पर्सनल कार्ड बनवाएँ।
</p>

<div class="contact-bar">
☎ <span id="vshopMobile">9142264714</span>
</div>

<div class="services">
<span>✓ PVC कार्ड</span>
<span>✓ फोटो कार्ड</span>
<span>✓ आईडी कार्ड</span>
<span>✓ कस्टम डिजाइन</span>
</div>

<div class="gold-divider"></div>

<p class="back-footer">
आज ही संपर्क करें!<br>
Premium Quality • Beautiful Finish
</p>

<p class="back-disclaimer">
Personal printing service • Not an official ID
</p>

</div>
</div>

</div>
</div>
</div>

</div>

<script>
(function() {

  const idList = [
    'name1',
    'mobile',
    'ration1',
    'aadhaar1',
    'name2',
    'ration2',
    'aadhaar2',
    'shopName',
    'shopMobile'
  ];

  function maskAadhaar(value) {
    const digits = String(value || '')
      .replace(/\\D/g, '');

    if (digits.length !== 12) {
      return 'XXXX XXXX XXXX';
    }

    return 'XXXX XXXX ' + digits.slice(-4);
  }

  function update() {
    idList.forEach(function(id) {
      const input = document.getElementById(id);
      const output = document.getElementById('v' + id);

      if (!input || !output) return;

      let value = input.value.trim();

      if (id.startsWith('aadhaar')) {
        value = maskAadhaar(value);
      }

      output.textContent = value || '—';
    });
  }

  idList.forEach(function(id) {
    const input = document.getElementById(id);

    if (input) {
      input.addEventListener('input', update);
    }
  });

  document.getElementById('photoInput')
    .addEventListener('change', function(event) {

      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('कृपया सही फोटो चुनें।');
        this.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = function() {
        const photo = document.getElementById('vphoto');
        const placeholder =
          document.getElementById('photoPlaceholder');

        photo.src = reader.result;
        photo.style.display = 'block';
        placeholder.style.display = 'none';
      };

      reader.readAsDataURL(file);
    });

  window.resetFields = function() {

    idList.forEach(function(id) {
      const input = document.getElementById(id);
      if (input) input.value = '';
    });

    document.getElementById('photoInput').value = '';

    const photo = document.getElementById('vphoto');
    photo.removeAttribute('src');
    photo.style.display = 'none';

    document.getElementById('photoPlaceholder')
      .style.display = 'flex';

    document.getElementById('shopName').value =
      'APNA WORK';

    document.getElementById('shopMobile').value =
      '9142264714';

    update();
  };

  update();

})();
</script>

</body>
</html>
`;
}

module.exports = RationCardMaker;
