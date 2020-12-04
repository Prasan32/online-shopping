

function preview() {
  frame.src = URL.createObjectURL(event.target.files[0]);
}
//addBrand for dynamic add field
$(function () {
  $(document).on('click', '#addbrandbutton', function (e) {
    e.preventDefault();
    var x = 1;
    if (x < 10) { //max input box allowed
      x++; //text box increment
      $(".input_fields_wrap").append('<div> <span class="d-inline-block my-1"><input type="text" class="form-control"name="brandName[]" placeholder="Enter BrandName" style="width:400px" required> </span> <a href="#" id="remove_field" class="remove_field d-inline-block btn btn-sm btn-danger">-</a></div>'); //add input box
    }
    return false;
  })
});
// subCategory for dynamic add field
$(function () {
  $(document).on('click', '#add_field_button', function (e) {
    e.preventDefault();
    var x = 1;
    if (x < 10) { //max input box allowed
      x++; //text box increment
      $(".input_fields_wrap").append('<div> <span class="d-inline-block my-1"><input type="text" class="form-control"name="subCategoryName[]" placeholder="Enter SubCategoryName..." style="width:400px" required> </span> <a href="#" id="remove_field" class="remove_field d-inline-block btn btn-sm btn-danger">-</a></div>'); //add input box
    }
    return false;
  })
});
/// dynamic add for submenuCategory
$(function () {
  $(document).on('click', '#add_field_buttons', function (e) {
    e.preventDefault();
    var x = 1;
    if (x < 10) { //max input box allowed
      x++; //text box increment
      $(".input_fields_wraps").append('<div> <span class="d-inline-block my-1"><input type="text" class="form-control"name="submenuCategoryName[]"  style="width:400px" required> </span> <a href="#" id="remove_field" class="remove_field d-inline-block btn btn-sm btn-danger">-</a></div>'); //add input box
    }
    return false;
  })
});
$(function () {
  $(document).on("click", "#remove_field", function (e) { //user click on remove text
    e.preventDefault();
    $(this).parent('div').remove();
    return false;
  });
});
$(function () {
  $(document).on('click', '.menuSubCategory', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      url: url,
      method: 'GET',
      success: function (data) {
        $('#menuSubCategory').html(data.html);
      }
    })
    return false;
  })
});
///
/// submit form of subCategory
$(function () {
  $(document).on('submit', '.subCategoryForm', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: data,

      success: function (data) {
        $('#subCategorys').html(data.html);
      },
    })
    return false;
  })
});
$(function () {
  $(document).on('submit', '.submenuCategoryForm', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    var type = $(this).attr('method');
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: type,
      data: data,
      success: function (data) {
        $('#menuSubCategory').html(data.html);
      }
    })
    return false;
  });
});


// $(document).ready(function () {
//   setInterval(fetchdata, 10000);

// });
// stock///
function seletedId() {
  var id = $('#selectedcategory option:selected').val();
  $.ajax({
    url: '/allProductstock/' + id,
    type: 'GET',
    success: function (data, textStatus, xhr) {
      $('#tbody').html(data.html);
      $('.table').DataTable();
      $('#productCount').html(data.totalCount)
    }
  });
}
$(function () {
  $(document).on('click', '#my-btn', function () {
    var id = $(this).attr('value');
    $('.div-hidden_' + id).show();
  });
  $(document).on('click', '.my-btn1', function () {
    var id = $(this).attr('value');
    $('.div-hidden_' + id).hide();
  });
});

$(function () {
  $(document).on('submit', '.js-update-stock', function (e) {
    e.preventDefault();

    var categoryId = [];
    $.each($("#selectedcategory option:selected"), function () {
      categoryId.push($(this).val());
    });
    var id = categoryId[0];
    var data = $(this).serializeArray();
    data.push({ name: "categoryId", value: id });
    $.ajax({
      url: '/product/editStockProduct',
      type: 'POST',
      data: data,
      success: function (data) {
        if (data.success == 'success') {
          $.notify({
            // options
            message: 'Successfully update'
          }, {
            // settings
            type: 'success'
          });

          $('#tbody').html(data.html);
          $('#productCount').html(data.totalCount)
          $('.table').DataTable();
        }
        else {
          $.notify({
            // options
            message: 'Error'
          }, {
            // settings
            type: 'warning'
          });
          $('.table').DataTable();
          $('#tbody').html(data.html);

        }

      }

    })

    //  data.forEach(function(result){

    //  })
  });
  return false;
});
$(function () {
  $(document).on('submit', '#addStock', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serializeArray();
    $.ajax({
      url: url,
      data: data,
      type: 'post',
      success: function (data) {
        if (data.error == 'error') {
          $.notify({
            // options
            message: 'Please Select Product'
          }, {
            // settings
            type: 'danger'
          });
          $('#addStock').trigger("reset");
        }
        else {
          $.notify({
            // options
            message: 'SuccessFully add'
          }, {
            // settings
            type: 'success'
          });
          $('#addStock').trigger("reset");
          $('#stockForm').html(data.html)
        }
      }
    })
    return false;
  })
})
// end stock
$(function () {
  $(document).on('submit', '.addCategory', function (e) {
    e.preventDefault();
    var url = $(this).attr("action");
    // var value = $("#formGroupExampleInput").val();
    // var pattern = /[0-9]/g;


    // if (value.match(pattern)) {
    //   $('#formGroupExampleInput').css('border', '1px solid red');
    // }
    // else {
    var data = $(this).serializeArray();
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function (data, textStatus, jqXHR) {
        $('#categoryModal').modal('hide');
        $('#placeModal').modal('hide');
        if (jqXHR.status == 209) {
          $.notify({
            // options
            message: 'Already Add'
          }, {
            // settings
            type: 'warning'
          });
        }
        else if (jqXHR.status == 200) {
          $.notify({
            // options
            message: 'Successfully Add'
          }, {
            // settings
            type: 'success'
          });
        }
        $('#tbody').html(data);
        //     //  alert({
        //     //   title: "Sweet!",
        //     //   text: "Here's a custom image.",
        //     //   imageUrl: 'thumbs-up.jpg'
        //     // });
      }
    })


    return false;
  });

});

$(function () {
  $(document).on('submit', '.categoryForm', function (e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var data = $(this).serializeArray();
    $.ajax({
      url: url,
      type: 'post',
      data: data,
      success: function (data, jqXHR) {
        $('tbody').html(data);
      }
    })
  });
  return false;
});

$(function () {
  $(document).on('submit', '.editingPlace', function (event) {
    var url = $(this).attr("action");
    var data = $(this).serializeArray();
    $.ajax({
      url: url,
      type: 'post',
      data: data,
      success: function (data, textStatus, jqXHR) {
        if (jqXHR.status == 210) {
          $.notify({
            // options
            message: 'Empty Field'
          }, {
            // settings
            type: 'danger'
          });
          $('tbody').html(data);
        }
        else if (jqXHR.status == 200) {
          $.notify({
            // options
            message: 'Successfully Update'
          }, {
            // settings
            type: 'success'
          });
          $('tbody').html(data);
        }
        else if (jqXHR.status == 209) {
          $.notify({
            // options
            message: 'Already Add'
          }, {
            // settings
            type: 'warning'
          });
        }
      }
    })
    event.preventDefault();
  });
});
///product
///edit Image
$(function () {
  $(document).on('submit', '.productImageEdit', function (event) {
    event.preventDefault();
    var url = $(this).attr("action");
    var categoryId = [];
    $.each($("#selectedcategory option:selected"), function () {
      categoryId.push($(this).val());
    });
    var catid = categoryId[0];
    var id = $(this).attr('id');
    var fileInput = document.getElementById('s' + id);
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('categoryId', catid);
    $.ajax({
      url: url,
      type: 'post',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data, textStatus, jqXHR) {
        if (data.error == 'error') {
          $.notify({
            // options
            message: 'Please Select Image'
          }, {
            // settings
            type: 'danger'
          });
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tbody').html(data.html);
          $('#productCount').html(data.totalCount);
          $('.table').DataTable();

          // 


        }
        else {
          $.notify({
            // options
            message: 'Successfully Update'
          }, {
            // settings
            type: 'success'
          });
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $('#tbody').html(data.html);
          $('#productCount').html(data.totalCount);
          $('.table').DataTable();
        }

      }
    })
  });
});
/// edit rate
$(function () {
  $(document).on('submit', '.editingProductRate', function (event) {
    var url = $(this).attr("action");
    var categoryId = [];
    $.each($("#selectedcategory option:selected"), function () {
      categoryId.push($(this).val());
    });
    var id = categoryId[0];

    var data = $(this).serializeArray();
    data.push({ name: "categoryId", value: id });
    event.preventDefault();
    $.ajax({
      url: url,
      type: 'post',
      data: data,
      success: function (data, textStatus, jqXHR) {
        if (data.error == 'String') {
          $.notify({
            // options
            message: 'Please Enter Number'
          }, {
            // settings
            type: 'danger'
          });
          $('#tbody').html(data.html);
          $('#productCount').html(data.totalCount);
          $('.table').DataTable();

        }
        else {
          $.notify({
            // options
            message: 'Successfully Update'
          }, {
            // settings
            type: 'success'
          });
          $('#tbody').html(data.html);
          $('#productCount').html(data.totalCount);
          $('.table').DataTable();
        }

      }
    })
    event.preventDefault();
  });
});
///////// end Product
function seletededId() {
  var id = $('#selectedcategory option:selected').val();
  $.ajax({
    url: '/viewProductcat/' + id,
    type: 'GET',
    success: function (data, textStatus, xhr) {
      $('#productCount').html(data.totalCount)
      $('#tbody').html(data.html);
      $('.table').DataTable();
    }
  });
}
//veiw order edit
$(function () {
  $('.getUrl').click(function (event) {
    event.preventDefault();
    var getUrl = $(this).attr('href');
    $.ajax({
      url: getUrl,
      type: 'GET',
      success: function (data) {
        $('#tbody').html(data);
      }
    })
  })
});

$(function () {
  $(document).on('submit', '.orderEditStatus', function (event) {
    event.preventDefault()
    var getUrl = $(this).attr('action');

    var data = $(this).serializeArray();
    $.ajax({
      url: getUrl,
      type: 'POST',
      data: data,
      success: function (data, textStatus) {
        if (textStatus == 'success') {
          $.ajax({
            url: '/countOrder',
            type: 'GET',
            success: function (data) {
              $('#newOrder').html(data.newOrder)
              $('.badge-pill').html(data.newOrder)
              $('#processing').html(data.process)
              $('#shipped').html(data.shipping)
              $('#delivered').html(data.delivery)
              $('#pending').html(data.pending)
            }
          })
        }
        $('#tbody').html(data);
      }
    })
  })
});

//for subCategory to display
$(function () {
  $(document).on('change', '#selectSubCategory', function (e) {
    e.preventDefault();
    var categoryId = $(this).val();

    var option = '';
    var option1 = '';
    $.ajax({
      url: '/subCategory/' + categoryId,
      type: 'GET',
      success: function (data) {
        var d = data.result;
        var c = data.result1;
        $('#subCategory').empty();
        $('#submenuCategory').empty();
        option += '<option value="0">Choose </option>'
        option1 += '<option value="0">Choose </option>'
        for (var i = 0; i < d.length; i++) {
          option += '<option value="' + d[i].subcategory_id + '">' + d[i].subcategory_name + '</option>'

        }
        for (var i = 0; i < c.length; i++) {
          option1 += '<option value="' + c[i].brand_id + '">' + c[i].brand_name + '</option>'
        }
        $('#subCategory').append(option);
        $('#submenuCategory').append(option1)
      }

    })

    return false;
  });
});
// $(function () {
//   $(document).on('change', '#subCategory', function (e) {
//     e.preventDefault();
//     var subcategoryId = $(this).val();
//     var option = '';
//     $.ajax({
//       url: '/subMenucategory/' + subcategoryId,
//       type: 'GET',
//       success: function (data) {
//         var d = data.result;
//         $('#submenuCategory').empty();
//         option += '<option value="0">Choose </option>'
//         for (var i = 0; i < d.length; i++) {
//           option += '<option value="' + d[i].submenucategory_id + '">' + d[i].submenucategory_name + '</option>'
//         }
//         $('#submenuCategory').append(option);
//       }
//     })
//     return false;
//   })
// });
$(function () {
  $(document).on('keyup', '.numberValue', function (e) {
    var value = $(this).val();
    if (value < 1) {
      $(this).css({ "border-color": "red" });
    }
    else {
      $(this).css({ "border-color": "gray" });
    }
  })
});
$(function () {
  $(document).on('change', '.js-select2', function (e) {

    var data = $(this).val()
    if (data == '0') {
      $(this).css({ "border-color": "red" });
    }
    else {
      $(this).css({ "border-color": "blue" });
    }

  });
  $(document).on('submit', '#productform', function (e) {
    e.preventDefault();
    var getUrl = $(this).attr('action');
    var file_data = $("#image").prop("files")[0];
    var categoryId = $("#selectSubCategory").val();
    var subcategory_id = $("#subCategory").val();
    var submenucategory_id = $("#submenuCategory").val();
    var product_name = $("#productName").val();
    var rate = $("#rate").val();

    var weight = $("#weight").val();
    var unit = $('#unit').val();
    var status = $("input[name='status']:checked").val();
    var desc = myEditor.getData();
    if (categoryId == '0') {
      $("#selectSubCategory").css({ "border-color": "red" });
    }
    else if (subcategory_id == '0') {
      $("#subCategory").css({ "border-color": "red" });
    }
    else if (submenucategory_id == '0') {
      $("#submenuCategory").css({ "border-color": "red" });
    }
    else if (unit == '0') {
      $("#unit").css({ "border-color": "red" });
    }
    else if (desc.length == 0) {
      $(".ck.ck-editor__main>.ck-editor__editable").css({ "border-color": "red" })
    }
    else {
      var formdata = new FormData();
      formdata.append("image", file_data);
      formdata.append("category_id", categoryId);
      formdata.append("subcategory_id", subcategory_id);
      formdata.append('submenucategory_id', submenucategory_id);
      formdata.append("product_name", product_name);
      formdata.append("price", rate);
      formdata.append("weight", weight);
      formdata.append("unit", unit);
      formdata.append("status", status);
      formdata.append("description", desc)
      $.ajax({
        url: getUrl,
        type: 'POST',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.success == "true") {
            $.notify({
              // options
              message: 'Successfully Add' + product_name
            }, {
              // settings
              type: 'success'
            });
            $("#productform").trigger("reset");
          }
          else if (data.success == "false") {
            $.notify({
              // options
              message: 'Already Add' + product_name
            }, {
              // settings
              type: 'danger'
            });
          }
          else {
            $.notify({
              // options
              message: 'Some Error'
            }, {
              // settings
              type: 'danger'
            });
          }

        }
      })
    }



    return false;
  })
});

$(function () {
  $("#tblLocations>tbody").sortable({
    stop: function(event,ui){
      var array = [];

      $("#tblLocations #tbody>tr").each(function(){
         array.push($(this).attr("id"))
      })
      var url = "/product/orderingCategory";
      update(array,url)
    }
  });
});

function update(data,url) {
  $.ajax({
    url:url,
    data:{postion:data},
    method:'POST',
    success: function(data){
      $('#tbody').html(data);
    }
  })
}
var snd = new Audio('/swiftly-610.mp3');
snd.load();
var socket = io('http://172.62.16.8:5000/notifaction');
socket.on('event', function (data) {
  snd.play();
  $.notify({
    // options
    message: ''+data.message
  }, {
    // settings
    type: 'success'
  });
  $.ajax({
    url: '/NewOrder',
    type: 'GET',
    success: function (data) {
      // Perform operation on the return value
      $('.badge-counter').html(data.count);
      $('.Order').html(data.count);
      $('.badge-pill').html(data.count);
    }
  });
});
