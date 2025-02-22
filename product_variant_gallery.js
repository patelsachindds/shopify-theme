jQuery(document).ready(function(){

  jQuery('.product-variant__item [name="product-color"], .product-variant__item [name="product-style"], .product-variant__item [name="product-size"]').click(function(){

    // window.product_gallery_destroy();
     var value_name = $(this).attr('data-name');
  
      var product_url = window.location.pathname;
      setTimeout(function(){

        var variant_qty = jQuery('.productSelect option[data-value="'+value_name+'"]').attr('data-qty');

        jQuery('.productSelect option').removeAttr('selected','selected');
        jQuery('.productSelect option[data-value="'+value_name+'"]').attr('selected','selected');
        
        $('.add_to_cart_button .background_button_color').removeClass('disabled');
        $('.background_button_color .add-to-cart-text').text("Add To Cart");
        $('.quantity_button').show();
        if(variant_qty == 0)
        {
            $('.add_to_cart_button .background_button_color').addClass('disabled');
            $('.disabled .add-to-cart-text').text("Sold Out");
            $('.quantity_button').hide();
        }
        var variant_id = jQuery('.productSelect option[data-value="'+value_name+'"]').val();
        
        var product_gallery_url =  product_url+"?variant="+variant_id+"&section_id=new-product-layout";
        jQuery('.product-content').addClass('loading');
        jQuery.ajax({
          type:"GET",
          url: product_gallery_url,
          success: function(data){
            var current_gallery = jQuery(data).find('.product-content').html();
            jQuery('.product-content').html(current_gallery);
            setTimeout(function(){
              window.product_init();
              jQuery('.product-content').removeClass('loading');
               jQuery('.featured_image').addClass('zoom');
              
            },1500);
        }
      });
      },50);

      
  });
  
});
