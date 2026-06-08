$(document).ready(function(){

  // Otomatis langsung memuat halaman home.html saat pertama kali website dibuka
  loadPage("home.html", "#homeBtn");

  // HAMBURGER TOGGLE (Tampilan HP)
  $("#hamburger").click(function(){
    $("#menu").toggleClass("show");
  });

  // FUNGSI UTAMA LOAD PAGE DENGAN SISTEM PROTEKSI ANTI-STUCK LOADING
  function loadPage(page, btn){
    // Tampilkan efek transisi keluar pada kotak konten utama
    $("#content").fadeOut(150, function(){
      
      // Tampilkan indikator teks pemuatan sementara agar user tahu proses sedang berjalan
      $("#content").html(`
        <div id="loading-spinner" style="text-align:center; padding: 60px 0; color: #94a3b8; font-family: sans-serif;">
          <div style="font-size: 24px; font-weight: 500; animation: pulse 1.5s infinite ease-in-out;">Memuat Halaman...</div>
        </div>
      `).show();

      // Eksekusi pemuatan Ajax file HTML eksternal
      $("#content").load(page, function(response, status, xhr){
        
        if (status === "error") {
          // JIKA FILE TIDAK DITEMUKAN (ERROR 404), MATIKAN LOADING DAN TAMPILKAN EROR RAPI
          $("#content").html(`
            <div style="text-align: center; padding: 40px; color: #ef4444;">
              <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
              <h3 style="margin-bottom: 8px; font-weight: 700; color: #fff;">Halaman Gagal Dimuat</h3>
              <p style="color: #94a3b8; font-size: 14px;">File halaman <strong>${page}</strong> belum ada atau gagal diakses di repositori.</p>
            </div>
          `);
        } else {
          // JIKA BERHASIL, JALANKAN EFEK FADE IN KONTEN UTAMA
          $("#content").hide().fadeIn(200);

          // Pemicu khusus jika halaman yang dibuka adalah data GitHub API
          if(page === "github.html"){
            loadGitHub();
          }
        }

        // Otomatis menggulirkan scroll kembali ke atas layar laptop/HP secara mulus
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Mengatur pergantian kelas aktif pada tombol navigasi utama
    $(".menu button").removeClass("active");
    $(btn).addClass("active");

    // Otomatis menutup kembali laci menu hamburger pada smartphone setelah diklik
    $("#menu").removeClass("show");
  }

  // EVENT LISTENERS TOMBOL NAVBAR
  $("#homeBtn").click(function(){ loadPage("home.html", this); });
  $("#aboutBtn").click(function(){ loadPage("about.html", this); });
  $("#contactBtn").click(function(){ loadPage("contact.html", this); });
  $("#githubBtn").click(function(){ loadPage("github.html", this); });
  $("#skillsBtn").click(function(){ loadPage("skills.html", this); });
  $("#eduBtn").click(function(){ loadPage("education.html", this); });
  $("#expBtn").click(function(){ loadPage("experience.html", this); });
  $("#portBtn").click(function(){ loadPage("portfolio.html", this); });
  
  // Menghubungkan tombol navbar menuju file sub-halaman pengenalan smartcampus.html
  $("#smartBtn").click(function(){ 
    loadPage("smartcampus.html", this); 
  });
  
  $("#certBtn").click(function(){ loadPage("certificate.html", this); });

});


/* KODE SISTEM INTEGRASI GITHUB REST API */
function loadGitHub(){
  let user = "fauzi-svg";

  $("#loading").show();
  $("#error").text("");
  $("#profile").hide();
  $("#repoList").empty();

  $.ajax({
    url: "https://api.github.com/users/" + user,
    success: function(data){
      $("#avatar").attr("src", data.avatar_url);
      $("#username").text(data.login);
      $("#followers").text(data.followers);
      $("#repos").text(data.public_repos);

      $.ajax({
        url: data.repos_url,
        success: function(repos){
          repos.slice(0,5).forEach(function(r){
            $("#repoList").append(
              `<li><a href="${r.html_url}" target="_blank">${r.name}</a></li>`
            );
          });

          $("#loading").hide();
          $("#profile").fadeIn();
        }
      });
    },
    error:function(){
      $("#loading").hide();
      $("#error").text("Gagal mengambil ringkasan data repositori GitHub");
    }
  });
}