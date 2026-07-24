function DoctorProfile(doctor) {
  return `
<style>
  :root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --accent: #10b981;
    --accent-hover: #059669;
    --bg-light: #f8fafc;
    --text-dark: #0f172a;
    --text-muted: #64748b;
  }

  .profile-page {
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .doctor-card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }

  /* Header Section */
  .profile-header {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0d9488 100%);
    padding: 40px 30px;
    text-align: center;
    color: #ffffff;
    position: relative;
  }

  .avatar-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 16px;
  }

  .profile-header img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ffffff;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .verified-badge {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: var(--accent);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    font-size: 14px;
  }

  .doc-name {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 6px 0;
    letter-spacing: -0.5px;
  }

  .doc-spec {
    display: inline-block;
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(8px);
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  /* Body Section */
  .profile-body {
    padding: 35px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 30px;
  }

  .info-card {
    background: var(--bg-light);
    padding: 18px;
    border-radius: 16px;
    border: 1px solid #f1f5f9;
    transition: all 0.2s ease;
  }

  .info-card:hover {
    transform: translateY(-2px);
    background: #ffffff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.04);
    border-color: #cbd5e1;
  }

  .info-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    font-weight: 600;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .info-value {
    font-size: 16px;
    color: var(--text-dark);
    font-weight: 600;
    word-break: break-word;
  }

  /* Action Box */
  .patient-action-box {
    background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
    border: 1px solid #bbf7d0;
    padding: 28px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .action-text h2 {
    margin: 0 0 4px 0;
    font-size: 20px;
    color: var(--text-dark);
  }

  .action-text p {
    margin: 0;
    color: var(--text-muted);
    font-size: 14px;
  }

  .consult-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--accent);
    color: white;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .consult-btn:hover {
    background: var(--accent-hover);
    box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
    transform: translateY(-1px);
  }

  @media(max-width: 640px) {
    .patient-action-box {
      flex-direction: column;
      text-align: center;
    }
    .consult-btn {
      width: 100%;
    }
  }
</style>

<div class="profile-page">
  <div class="doctor-card">
    
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="avatar-wrapper">
        <img src="${doctor.image || "/images/default-doctor.png"}" alt="Dr. ${doctor.name || 'Doctor'}">
        <span class="verified-badge">✓</span>
      </div>
      <h1 class="doc-name">Dr. ${doctor.name || "N/A"}</h1>
      <span class="doc-spec">${doctor.specialization || "General Physician"}</span>
    </div>

    <!-- Profile Details -->
    <div class="profile-body">
      <div class="info-grid">
        
        <div class="info-card">
          <div class="info-label">🎓 Degree</div>
          <div class="info-value">${doctor.degree || "N/A"}</div>
        </div>

        <div class="info-card">
          <div class="info-label">⏳ Experience</div>
          <div class="info-value">${doctor.experience ? doctor.experience + ' Years' : 'N/A'}</div>
        </div>

        <div class="info-card">
          <div class="info-label">🏥 Hospital</div>
          <div class="info-value">${doctor.hospital || "N/A"}</div>
        </div>

        <div class="info-card">

  <div class="info-label">
    📞 Phone Number
  </div>

  <div class="info-value" id="doctorPhone">
    **********
  </div>

  <br>

  <button
      onclick="unlockPhone()"
      id="unlockBtn"
      style="
      background:#16a34a;
      color:#fff;
      border:none;
      padding:10px 18px;
      border-radius:10px;
      cursor:pointer;
      font-weight:bold;
      ">
      🔓 Unlock for ₹1
  </button>

  </div>

        <div class="info-card" style="grid-column: span 2 / -1;">
          <div class="info-label">📍 Address</div>
          <div class="info-value">${doctor.address || "N/A"}</div>
        </div>

      </div>

      <!-- Action Box -->
      <div class="patient-action-box">
        <div class="action-text">
          <h2>Online Consultation</h2>
          <p>Book a slot and connect directly with Dr. ${doctor.name || 'Doctor'}</p>
        </div>
        <a href="/admin/consultation/${doctor._id}" class="consult-btn">
          Start Consultation →
        </a>
      </div>

    </div>

  </div>
</div>

<script>

async function unlockPhone(){

    const btn = document.getElementById("unlockBtn");

    btn.innerHTML = "Please Wait...";
    btn.disabled = true;

    try{

        const res = await fetch("/create-phone-payment",{
            method:"POST"
        });

        const order = await res.json();

        const options = {

            key: "YOUR_RAZORPAY_KEY", // अपनी Razorpay Key डालो

            amount: order.amount,
            currency: order.currency,
            order_id: order.id,

            name:"HHGS",
            description:"Doctor Phone Unlock",

            handler:function(response){

                fetch("/verify-phone-payment",{

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({

                        paymentId:response.razorpay_payment_id,
                        doctorId:"${doctor._id}"

                    })

                })

                .then(res=>res.json())

                .then(data=>{

                    if(data.success){

                        document.getElementById("doctorPhone").innerHTML =
                        "${doctor.phone}";

                        btn.innerHTML="Unlocked ✔";

                    }

                });

            }

        };

        const rzp = new Razorpay(options);

        rzp.open();

    }catch(err){

        btn.disabled = false;
        btn.innerHTML = "🔓 Unlock for ₹1";

        alert("Payment Failed");

    }

}

</script>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
`;
}

module.exports = DoctorProfile;