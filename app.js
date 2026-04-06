$(document).ready(function(){

  // HAMBURGER TOGGLE
  $("#hamburger").click(function(){
    $("#menu").toggleClass("show");
  });

  function loadPage(page, btn){
    $("#content").fadeOut(150, function(){
      $("#content").load(page, function(){
        $("#content").fadeIn(200);

        if(page === "github.html"){
          loadGitHub();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    $(".menu button").removeClass("active");
    $(btn).addClass("active");

    // auto close menu mobile
    $("#menu").removeClass("show");
  }

  $("#homeBtn").click(function(){ loadPage("home.html", this); });
  $("#aboutBtn").click(function(){ loadPage("about.html", this); });
  $("#contactBtn").click(function(){ loadPage("contact.html", this); });
  $("#githubBtn").click(function(){ loadPage("github.html", this); });
  $("#skillsBtn").click(function(){ loadPage("skills.html", this); });
  $("#eduBtn").click(function(){ loadPage("education.html", this); });
  $("#expBtn").click(function(){ loadPage("experience.html", this); });
  $("#portBtn").click(function(){ loadPage("portfolio.html", this); });
  $("#certBtn").click(function(){ loadPage("certificate.html", this); });

});


/* GITHUB API */
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
      $("#error").text("Gagal ambil data GitHub");
    }
  });

}
