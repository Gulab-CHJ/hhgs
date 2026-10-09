
function RationCardMaker() {
return `
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ration Card PVC Maker</title>

<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 20px;
  background: #eef2f7;
  font-family: Arial, sans-serif;
  color: #17212b;
}

.wrap {
  max-width: 960px;
  margin: auto;
}

h1 {
  text-align: center;
  font-size: 25px;
}

.form {
  background: white;
  padding: 22px;
  border-radius: 12px;
  box-shadow: 0 3px 12px #0001;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 18px;
}

.field label {
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 6px;
}

.field input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  padding: 11px;
  font-size: 14px;
}

.actions {
  margin-top: 17px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  border: 0;
  border-radius: 7px;
  padding: 12px 20px;
  cursor: pointer;
  color: white;
  background: #126c42;
  font-weight: 700;
}

.note {
  font-size: 12px;
  color: #64748b;
}

.preview-title {
  text-align: center;
  margin: 26px 0 12px;
}

/* A4 PORTRAIT */
.sheet {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  background: white;
  position: relative;
  box-shadow: 0 6px 25px #0002;
  padding: 15mm 10mm;
}

.cards {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 190mm;
}

/* PVC CARD SIZE */
.pvc-card {
  width: 86mm;
  height: 54mm;
  flex: 0 0 86mm;
  overflow: hidden;
  background: #d9e8ef;
  border: 1px solid #26383d;
  padding: 2mm;
  color: #0b1516;
}

.frame {
  width: 100%;
  height: 100%;
  border: 1.4px solid #192b31;
  padding: 1.6mm 2mm;
  overflow: hidden;
}

/* FRONT SIDE */
.front-title {
  font-family: Georgia, serif;
  font-size: 19px;
  letter-spacing: 4px;
  text-align: center;
  font-weight: 400;
  margin: 0 0 2mm;
}

.front-row {
  display: flex;
  gap: 1.5mm;
}

.front-info {
  flex: 1;
  min-width: 0;
}

.front p {
  font-size: 9px;
  font-weight: 700;
  line-height: 1.17;
  margin: 0 0 1.4mm;
  overflow-wrap: anywhere;
}

.photo {
  width: 18mm;
  height: 22mm;
  flex: none;
  border: 2px solid #142226;
  object-fit: cover;
  background: #f8fafc;
}

.front-bottom {
  margin-top: 1.2mm;
}

.front-foot {
  font-size: 6px;
  text-align: right;
  color: #586772;
  margin-top: 1mm;
}

/* BACK SIDE */
.back {
  background: #c9e2e7;
}

.back .frame {
  border: 2px solid #1d3333;
  border-radius: 5mm;
  text-align: center;
  padding: 2mm;
}

.back-heading {
  font-family: Georgia, serif;
  font-weight: 700;
  font-size: 11px;
  margin: 1.8mm 0 1mm;
  color: #463c20;
}

.back-sub {
  font-size: 10px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1.2mm;
}

.blackbar {
  margin: 0.8mm auto;
  background: #080e0c;
  color: #d3d0b8;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  padding: 1mm 2mm;
  line-height: 1.15;
  width: 91%;
  text-align: left;
  white-space: nowrap;
}

.checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  padding: 0 8mm;
  gap: 1mm 6mm;
  margin: 1.7mm 0 1.2mm;
  font-size: 10px;
  font-weight: 800;
}

.back-footer {
  font-size: 10px;
  font-weight: 800;
  line-height: 1.3;
  color: #4e421f;
  margin-top: 1mm;
}

@media(max-width:900px) {
  .sheet-holder {
    overflow-x: auto;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

/* PRINT */
@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  body {
    margin: 0;
    padding: 0;
    background: white;
  }

  .form,
  h1,
  .preview-title {
    display: none !important;
  }

  .wrap {
    max-width: none;
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
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .pvc-card {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
</head>

<body>
<div class="wrap">

<h1>Ration Card PVC Maker</h1>

<div class="form">

<h3>कार्ड की जानकारी भरें</h3>

<div class="grid">

<div class="field">
<label>पहला Head of Family</label>
<input id="name1" value="Jalifan Khatun">
</div>

<div class="field">
<label>मोबाइल नंबर</label>
<input id="mobile" value="9142264714">
</div>

<div class="field">
<label>पहला राशन कार्ड नंबर</label>
<input id="ration1" value="10140150132068600015">
</div>

<div class="field">
<label>पहला आधार नंबर</label>
<input id="aadhaar1"
       maxlength="12"
       inputmode="numeric"
       placeholder="12 digit Aadhaar">
</div>

<div class="field">
<label>दूसरा Head of Family</label>
<input id="name2" value="Md Hasim">
</div>

<div class="field">
<label>दूसरा राशन कार्ड नंबर</label>
<input id="ration2" value="10140080121028800014">
</div>

<div class="field">
<label>दूसरा आधार नंबर</label>
<input id="aadhaar2"
       maxlength="12"
       inputmode="numeric"
       placeholder="12 digit Aadhaar">
</div>

<div class="field">
<label>फोटो अपलोड करें</label>
<input id="photoInput" type="file" accept="image/*">
</div>

</div>

<div class="actions">

<button type="button" onclick="window.print()">
🖨 Print / Save PDF
</button>

<button type="button"
        onclick="resetFields()"
        style="background:#475569">
Reset Form
</button>

</div>

<p class="note">
A4 Portrait | PVC Size 86 × 54 mm |
Scale 100% | Background Graphics ON
</p>

</div>

<h3 class="preview-title">
A4 Portrait — Front Left | Back Right
</h3>

<div class="sheet-holder">
<div class="sheet">

<div class="cards">

<!-- FRONT -->
<div class="pvc-card front">
<div class="frame">

<h2 class="front-title">Ration card</h2>

<div class="front-row">

<div class="front-info">
<p>Head of Family:
<span id="vname1"></span></p>

<p>Mobile:
<span id="vmobile"></span></p>

<p>Ration Card No.:
<span id="vration1"></span></p>

<p>Aadhaar No.:
<span id="vaadhaar1"></span></p>
</div>

<img class="photo" id="vphoto" alt="Photo">

</div>

<div class="front-bottom">

<p>Head of Family:
<span id="vname2"></span></p>

<p>Ration Card No.:
<span id="vration2"></span></p>

<p>Aadhaar No.:
<span id="vaadhaar2"></span></p>

</div>

<div class="front-foot">
Personal Reference Copy
</div>

</div>
</div>

<!-- BACK -->
<div class="pvc-card back">
<div class="frame">

<div class="back-heading">
✦ Premium PVC Card Design Available ✦
</div>

<p class="back-sub">
इस तरह का शानदार और प्रीमियम लुक वाला कार्ड
बनवाने के लिए संपर्क करें.
</p>

<div class="blackbar">
☎ मोबाइल: 9142264714
</div>

<div class="blackbar">
▣ Shop Name: Apna Work
</div>

<div class="checks">
<span>✅ बैंक कार्ड</span>
<span>✅ आधार कार्ड</span>
<span>✅ आईडी कार्ड</span>
<span>✅ कस्टम डिजाइन उपलब्ध</span>
</div>

<div class="back-footer">
👉 आज ही अपना कार्ड बनवाएँ<br>
बेहतर क्वालिटी, शानदार फिनिश के साथ.
</div>

</div>
</div>

</div>
</div>
</div>

</div>

<script>
const idList = [
  'name1',
  'mobile',
  'ration1',
  'aadhaar1',
  'name2',
  'ration2',
  'aadhaar2'
];

function mask(v) {
  const digits = v.replace(/[^0-9]/g, '');

  return 'XXXX XXXX ' +
    (digits.length >= 4
      ? digits.slice(-4)
      : 'XXXX');
}

function update() {
  idList.forEach(function(id) {
    const input = document.getElementById(id);
    const output = document.getElementById('v' + id);

    let value = input.value.trim();

    if (id.startsWith('aadhaar')) {
      value = mask(value);
    }

    output.textContent = value || '—';
  });
}

idList.forEach(function(id) {
  document.getElementById(id)
    .addEventListener('input', update);
});

document.getElementById('photoInput')
  .addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Image चुनें');
      return;
    }

    const reader = new FileReader();

    reader.onload = function() {
      document.getElementById('vphoto').src =
        reader.result;
    };

    reader.readAsDataURL(file);
  });

function resetFields() {
  document.querySelectorAll(
    '.grid input:not([type=file])'
  ).forEach(function(input) {
    input.value = '';
  });

  document.getElementById('photoInput').value = '';
  document.getElementById('vphoto').removeAttribute('src');

  update();
}

update();
</script>

</body>
</html>
`;
}

module.exports = RationCardMaker;
