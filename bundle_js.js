
$(document).ready(function(){

  $('.read_more_desc').click(function(){
    
    $(this).parents('.collection_information').find('.collection_description').toggleClass('active');
    $(this).text($(this).text() == 'Show Less' ? 'Show More...' : 'Show Less');
  });

//  -----------------------------------
  
  $('.product_tab_wrapper ul li').click(function(){
         $('.product_tab_wrapper ul li').removeClass('active_heading');
      $(this).addClass('active_heading');
      $('.product_tab_content .tab-pane').removeClass('active_content');
      var tab_value = $(this).attr('data-value');
      $('.product_tab_content .tab-pane[tab-value="'+tab_value+'"]').addClass('active_content');
      
  });

  //  ----------------------------- Product Set Included JS -----------------------------

  $('.quantity_btn').click(function(){

        var selected_symbol = $(this).attr('data-symbol');
        var current_input_value = $(this).parents('.quantity_buttons').find('.quantity_value').val();

        var quantity_value;

        if(selected_symbol == '-')
        {
              quantity_value = parseFloat(current_input_value) - 1;
              if(quantity_value == 1)
              {
                  $(this).parents('.quantity_buttons').find('.minus_btn').addClass('disabled');
              }
        }
        if(selected_symbol == '+')
        {
            quantity_value = parseFloat(current_input_value) + 1;
            $(this).parents('.quantity_buttons').find('.minus_btn').removeClass('disabled');
        }
        $(this).parents('.quantity_buttons').find('.quantity_value').val(quantity_value);    
  });
     
  $('.product-form__submit').click(function(e){

      var set_include_ids = [];
      
      $('.set_include_product').each(function(){
        var second_variant_id = $(this).attr('data-variant-id');
        var qtys = $(this).find('.quantity_value').val();
        if(qtys > 1)
        {
          set_include_ids.push({
                      quantity: qtys,
                      id: second_variant_id
          });
        }

      });
  
        // var qty = $('.quantity_value').val();
      var currenct_main_prd_variant_qty = $('.product-variant-id').val();
      var main_prd_qty = $('.product-form__quantity .quantity__input').val();
    
      set_include_ids.push({
          
                  quantity: main_prd_qty,
                  id: currenct_main_prd_variant_qty
              
        })
        var all_items  =  set_include_ids;

     
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: { items: all_items
        },
        dataType: 'json', 
        success: function (data) { 
          
          $('.cart-notification').addClass('active');
          
          for(var i=0;i<data.items.length;i++)
          {
              var notification_data = `<div class="main_cart_notification"><div class="cart-notification-product__image global-media-settings">
                  <img src="`+data.items[i].image+`" alt="" width="70" height="51" loading="lazy" /></div>
                  <div><h3 class="cart-notification-product__name h4">`+data.items[i].title+`</h3>
                  <dl></dl></div></div>`;
              $('#cart-notification-product').append(notification_data);
          }

          $.getJSON( "/cart.js").done(function( response ) {
                  $('.cart_items').text("("+response.item_count+")");
          })          
        } 
        });
    
  });

  
});