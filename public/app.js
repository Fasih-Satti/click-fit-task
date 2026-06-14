$(function () {
  const $dropzone = $('#dropzone');
  const $imageInput = $('#imageInput');
  const $uploadMessage = $('#uploadMessage');
  const $gallery = $('#gallery');
  const $notice = $('#notice');
  const $mainNav = $('#mainNav');
  const $apiFeed = $('#api-feed');

  // Custom alert banner
  function showNotice(message, isSuccess = true) {
    $notice.html(`<i class="fa-solid ${isSuccess ? 'fa-circle-check text-success' : 'fa-triangle-exclamation text-warning'} fs-4"></i> ${message}`)
           .fadeIn(200)
           .delay(3000)
           .fadeOut(400);
  }

  // Load uploaded images from the server
  function loadImages() {
    $.getJSON('/api/images')
      .done(function (response) {
        if (!response.success || !response.images.length) {
          $gallery.html('<p class="text-muted w-100 text-center py-5 fs-5"><i class="fa-solid fa-images fa-2x mb-3 d-block"></i>No images uploaded yet.</p>');
          return;
        }

        $gallery.empty();
        response.images.forEach(function (image) {
          const img = $('<img>', { src: image.path, alt: image.name });
          $gallery.append(img);
        });
      })
      .fail(function () {
        $gallery.html('<p class="text-danger w-100 text-center py-5 fw-bold"><i class="fa-solid fa-triangle-exclamation fa-2x mb-3 d-block"></i>Unable to load gallery. Make sure the backend is running.</p>');
      });
  }

  // Navbar scroll effect
  function checkNavScroll() {
    if ($(window).scrollTop() > 20) {
      $mainNav.addClass('nav-scrolled');
    } else {
      $mainNav.removeClass('nav-scrolled');
    }
  }
  $(window).on('scroll resize', checkNavScroll);
  checkNavScroll();

  // Drag and Drop Upload logic
  $imageInput.on('change', function () {
    const file = this.files[0];
    if (!file) return;
    uploadFile(file);
    // Reset the input so the same file can be uploaded again if needed
    this.value = '';
  });

  $dropzone.on('dragover', function (event) {
    event.preventDefault();
    $dropzone.addClass('dragover');
  });

  $dropzone.on('dragleave', function () {
    $dropzone.removeClass('dragover');
  });

  // Reveal animations on scroll
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('active'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: stop observing once revealed
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  }
  initReveal();

  $dropzone.on('drop', function (event) {
    event.preventDefault();
    $dropzone.removeClass('dragover');
    const file = event.originalEvent.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  });

  $dropzone.on('click', function (event) {
    // Prevent infinite bubbling loop
    if (event.target.id !== 'imageInput') {
      $imageInput.trigger('click');
    }
  });

  function uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    $uploadMessage.html('<span class="text-primary"><i class="fa-solid fa-spinner fa-spin me-2"></i>Uploading instantly to Node.js backend...</span>');
    $.ajax({
      url: '/api/upload',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false
    })
      .done(function (response) {
        $uploadMessage.html(`<span class="text-success"><i class="fa-solid fa-circle-check me-2"></i>Uploaded successfully to /upload_images!</span>`);
        showNotice('Image saved locally to the server!', true);
        loadImages();
      })
      .fail(function () {
        $uploadMessage.html('<span class="text-danger"><i class="fa-solid fa-circle-xmark me-2"></i>Upload failed. Server might be down.</span>');
        showNotice('Upload failed', false);
      });
  }

  // Handle other links per requirements
  $('.page-link').on('click', function (event) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 90 }, 500);
    } else {
      event.preventDefault();
      showNotice('Demo Notice: External links are disabled.', false);
    }
  });

  // Handle the mock Signup Form
  $('#signupForm').on('submit', function (e) {
    e.preventDefault();
    showNotice('User registered via MySQL addUser procedure simulation!', true);
    this.reset();
  });

  // Toggle Password Visibility
  $('#togglePassword').on('click', function () {
    const $pass = $('#passwordInput');
    const type = $pass.attr('type') === 'password' ? 'text' : 'password';
    $pass.attr('type', type);
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
  });

  // Clear Photos
  $('#clearPhotosBtn').on('click', function () {
    if(confirm('Are you sure you want to delete all uploaded photos?')) {
      $.ajax({
        url: '/api/images',
        method: 'DELETE'
      })
      .done(function () {
        showNotice('All photos cleared successfully.', true);
        loadImages();
      })
      .fail(function () {
        showNotice('Failed to clear photos.', false);
      });
    }
  });

  // Fetch API Data with beautiful card formatting
  $.ajax({
    url: 'https://api.restful-api.dev/objects',
    method: 'GET',
    dataType: 'json',
    timeout: 5000 // 5 seconds timeout
  })
    .done(function (data) {
      const itemsToShow = data.slice(0, 6);
      let htmlContent = '<div class="row g-3 p-3">';
      itemsToShow.forEach(item => {
        let details = '';
        if (item.data) {
          for (const [key, value] of Object.entries(item.data)) {
            details += `<span class="badge bg-white text-dark border me-1 mb-1">${key}: ${value}</span>`;
          }
        }
        htmlContent += `
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm" style="border-radius: 12px; background: #f1f5f9;">
              <div class="card-body p-3">
                <h6 class="fw-bold mb-2 text-primary text-truncate"><i class="fa-solid fa-mobile-screen me-2"></i>${item.name}</h6>
                <div>${details || '<span class="text-muted small">No extra data</span>'}</div>
              </div>
            </div>
          </div>`;
      });
      htmlContent += '</div>';
      $apiFeed.html(htmlContent);
    })
    .fail(function (xhr, status, error) {
      $apiFeed.html(`<div class="alert alert-warning m-3 fw-bold"><i class="fa-solid fa-triangle-exclamation me-2"></i>Live API failed. Please check network.</div>`);
    });

  // Initialize
  loadImages();
});
