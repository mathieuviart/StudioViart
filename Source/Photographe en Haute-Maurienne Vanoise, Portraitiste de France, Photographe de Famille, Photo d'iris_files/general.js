function CheckAll( element )
{ 
        $("#" + element + " input[type='checkbox']").attr('checked', true);
    
}

$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function validform(arr, ormode) {

	if (ormode != true) {
		//aucun ne doit être vide
		ret = true ;
		$.each(arr, function(index, value) {
			trace (value);
			val = $('*[name="'+value+'"]').val() ;
			if ( $.trim(val) == '') {
				ret = false ;
				$('*[name="'+value+'"]').css('border','1px solid red').effect( "shake", {}, 50 );
			}
		});
	} else {
		//au moins un doit être remplis
		//aucun ne doit être vide
		ret = false ;
		$.each(arr, function(index, value) {
			trace (value);
			val = $('*[name="'+value+'"]').val() ;
			if ( $.trim(val) != '') {
				ret = true ;				
			} else {
				if (ret != true) {
				$('*[name="'+value+'"]').css('border','1px solid orange').effect( "shake", {}, 50 );
				}
			}
		});
	
	
	}
	
	
	return ret;
}

function trace (dataobj) {


  // if (typeof window.console != 'undefined') {
	if (window.console || document.console ) {
		//alert (' console ok');
		console.log(dataobj);
	} else {
	//	alert ('pas de console');
	return false;
	}
}

function visibleWindowHeight() {
  var myWidth = 0;
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
   
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
   
    myHeight = document.body.clientHeight;
  }

  return myHeight ;
}
function visibleWindowWidth() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    
  }

  return myWidth ;
}

function in_array(array, p_val) {
    for(var i = 0, l = array.length; i < l; i++) {
        if(array[i] == p_val) {
            rowid = i;
            return true;
        }
    }
    return false;
}

function is_email(email){
	var result = email.search(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,3})+$/);
	if(result > -1){ return true; } else { return false; }
}


function endsWith(str, pattern){

	
		 var d = str.length - pattern.length;
		return d >= 0 && str.lastIndexOf(pattern) === d;
		
		
	}

/********  FUNCTION GENERIQUE AJAX   ***********/

//affiche un message html dans une div
//data : un objet contenant une valeur 'msg' au format html
//options de réponse : 
//		msg : Contenu html de la réponse
//		cssclass : nom de la class css à appliquer à la div de réponse. par défaut la class success ou error est appliquée en fonction de data.success. Pour ne rien appliquer retourner la valeur 'none'
//		success : 1 = tout va bien, 0 = il y a eu un erreur
//		prepend : 	undefined ou 0 = remplacer le contenu de la div par la réponse reçue
//					1 = ajouter le contenu de la réponse au debut de la div 
//					2 = ajouter le contenu de la réponse à la fin de la div
//		fade : 		undefined ou 0 : laisser la réponse affichée
//					1 = faire disparaitre la réponse après 3 secondes



function see_response (data, div_response){
//	alert ('see_response'+data.msg+' div_response='+div_response);

	if (data.success == '1') {			
		$(div_response).removeClass();
		if (!data.cssclass)  {			
			$(div_response).addClass('success');
		}		
	} else if (data.success == '0'){		
		$(div_response).removeClass();		
		if (!data.cssclass)  {			
			$(div_response).addClass('error');
		}		
	} 
	
	if ( (data.append == undefined || data.append == 0) && (data.prepend == undefined || data.prepend == 0) ) {	
		$(div_response).html(data.msg);
	} else {
		//on vire les img loader
	//	//trace('append');
		$(div_response).find('img.loaderimg').remove();
		
		if ((data.prepend == undefined || data.prepend == 0) ) {
			$(div_response).html(data.msg);
		} else if (data.prepend == 1) {
			$(div_response).prepend(data.msg);
		} else {
			$(div_response).append(data.msg);
		}
	}
	
	$(div_response).show();
	$(div_response).hide();
	
	
	if (data.fade == undefined || data.fade == 0) {
		$(div_response).fadeIn(500);	
	} else {
		$(div_response).fadeIn(500).delay(2000).fadeOut(500);	
	}
	
	//on set la class forcée
	if (data.cssclass) {			
		if (data.cssclass != 'none') {			
			$(div_response).addClass(data.cssclass);
		}
	} 
		
	/* initialisation des plugins jquery ds le coneneur */
	
	//nb_pages_slider();
	//table_menu_width(div_response);		
}




// url_file : nom du fichier à qui envoyer les variables
// datas : variables encodées en JSON
// div_response : id de l'élément HTML ou doit s'afficher la réponse
// func_after : String ou Array de noms fonction(s) à exécuter en cas de success. 
//              Cette ou ces fonctions reçevront en argument data (la réponse du serveur au format json)
//														     et div_response : ID de la div ou affiher
// prepend : 	0 ou null = l'image loader remplace le contenu de la réponse si elle existe
//				1 = l'image loader le positionnne avant
//				2 = l'image so positionne après

function ajax_send (url_file, datas, div_response, funct_after, prepend) {
	$.ajax({ // fonction permettant de faire de l'ajax
		   type: "POST", // methode de transmission des données au fichier php
		   url: url_file, // url du fichier php
		   data: datas, // données à transmettre	
		   dataType :"json",
		   beforeSend: function () { 
		   		$(div_response).show();
			    $(div_response).removeClass();
				
				
				if (url_file != URL_SITE+'zadmin/ajax/label.php') {
				//on supprime tous les input de traduction masqués avant d'envoyer un form si  on est pas en train de faire une trad
				$('body').find('input.inputtrad').remove();
				}
				
				//comportement de l'image loader
				if ((prepend == undefined || prepend == 0) ) {
					$(div_response).html('<img src="'+URL_SITE+'images/loading.gif" class="loaderimg">');
				} else if (prepend == 1) {
					$(div_response).prepend('<img src="'+URL_SITE+'images/loading.gif" class="loaderimg">');
				} else {
					$(div_response).append('<img src="'+URL_SITE+'images/loading.gif" class="loaderimg">');
				}
				
				
			},
		   
		   success: function(data){ // si l'appel a bien fonctionné
				//on execute la fonction prévue en success
				
				if (typeof(funct_after)=="object") {
				//	//trace (funct_after);
					for (x in funct_after) {
						//alert (funct_after[x]);
						if (window[funct_after[x]]){
							window[funct_after[x]](data, div_response);
						}	
					}					
				} else {
						//alert ('string : '+funct_after);
						if (window[funct_after]){
							window[funct_after](data, div_response);
						}						
				}
				
				
		   },
			error: function (data) {
			  // alert ('AJAX error');
			 // //trace (data);
			  if (data.readyState != 0) {			  
					// see_response (data, div_response);
					$(div_response).html('<div class="error">AJAX error</div>');
			   } else {
					//changement de page avant la fin de la requete ajax
					//$(div_response).html('<div class="error">Abandon</div>');			  
			   }
		   }
		});
}

$.fn.tagName = function() {
   return this.get(0).tagName.toLowerCase();
}

function r_slider_lines(data, div) {

	var sURL = unescape(window.location);
	sURL = sURL+'#'+data.nomTableau ;
	window.location.href = sURL;
	 window.location.reload( false );
}
function loadDispo (idDispo, div) {
	//on supprime tous les éditeurs
    var allInstances = CKEDITOR.instances;
    for (var i in allInstances) {
        editor = allInstances[i];
        CKEDITOR.remove(editor);
    }
	//chargement du template disposition
	ajax_send (URL_SITE+'zadmin/ajax/loadDispo.php',{"idDispo":""+idDispo+""}, div, new Array( "see_response","activeCKEDITOR"));
}
function loadTemplateOptions (idTemplate, idSite, div) {
	//on supprime tous les éditeurs
    var allInstances = CKEDITOR.instances;
    for (var i in allInstances) {
        editor = allInstances[i];
        CKEDITOR.remove(editor);
    }
	//chargement du template disposition
ajax_send (URL_SITE+'zadmin/ajax/loadTemplateOptions.php',{"idTemplate":""+idTemplate+"","idSite":""+idSite+""}, div, new Array( "see_response","activeCKEDITOR"));
}

function loadModuleOptions (idModule, idPage, div) {
	//on supprime tous les éditeurs
    var allInstances = CKEDITOR.instances;
    for (var i in allInstances) {
        editor = allInstances[i];
        CKEDITOR.remove(editor);
    }
	//chargement du template disposition
ajax_send (URL_SITE+'zadmin/ajax/loadModuleOptions.php',{"idModule":""+idModule+"","idPage":""+idPage+""}, div, new Array( "see_response","activeCKEDITOR"));
}


function loadZone (idDisposition, idPage, div) {
	//on supprime tous les éditeurs
	////trace (CKEDITOR);
    var allInstances = CKEDITOR.instances;
    for (var i in allInstances) {
        editor = allInstances[i];
        CKEDITOR.remove(editor);
    }
	//chargement du template disposition
	ajax_send (URL_SITE+'zadmin/ajax/loadZone.php',{"idDisposition":""+idDisposition+"","idPage":""+idPage+""}, div, new Array( "see_response","activeCKEDITOR"));
}

//remplace tte les instaces de textarea par des ckeditor
function activeCKEDITOR() {
	
	trace ('activeCKEDITOR');
	/*filebrowserUploadUrl:URL_SITE+'filemanager/index.php',
		filebrowserFlashUploadUrl:URL_SITE+'filemanager/index.php',
		filebrowserImageUploadUrl:URL_SITE+'filemanager/index.php',*/
	////trace ('activeCKEDITOR');
	var ckconfig = {
		jqueryOverrideVal:true,
		basePath:URL_SITE+'ckeditor/',
		filebrowserBrowseUrl:URL_SITE+'filemanager/index.php',
		filebrowserImageBrowseUrl:URL_SITE+'filemanager/index.php',
		filebrowserFlashBrowseUrl:URL_SITE+'filemanager/index.php',
		uploadUrl :URL_SITE+'filemanager/uploadimage.php',
		removeButtons : 'Save,NewPage,Templates,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Language,Smiley,PageBreak,About',

		skin:'moonocolor',
		allowedContent : true,
		protectedSource : Array(),
	

	};

	ckconfig.protectedSource.push(/<i[^>]*><\/i>/g);
	ckconfig.protectedSource.push(/<a[^>]*><\/a>/g);
	ckconfig.protectedSource.push(/<span[^>]*><\/span>/g);
	ckconfig.protectedSource.push(/<div[^>]*><\/div>/g);
	// ckconfig.protectedSource.push(/<br[^>]*>/g);
	

	$( 'textarea.jsckeditor' ).ckeditor(ckconfig);
	
	
	
	$('textarea.jsckeditor').each(function() {
		var editor = $(this).ckeditorGet();
		//trace( editor );
		//trace( editor.getData() );
		
		////trace ($(this).
		////trace ($(this).attr('name')+' = '+$(this).val()+' '+$(this).attr('class'));
	});
	//trace('-------------------------------------------');
	

}
function numeric(chaine) {
 temp = chaine.replace(/[^0-9\.-]/gi,"");
 return temp;
}
  
// Remplace les caractères accentués
function noaccent(chaine) {

  temp = chaine.replace(/[àâä]/gi,"a")
  temp = temp.replace(/[éèêë]/gi,"e")
  temp = temp.replace(/[îï]/gi,"i")
  temp = temp.replace(/[ôö]/gi,"o")
  temp = temp.replace(/[ùûü]/gi,"u")
  temp = temp.replace(/[ç]/gi,"c")
  

  return temp
}

//trace (noaccent('éàç'));
function str_urlSeoPage(url) {
//trace(url);
url = noaccent(url);
 url = url.replace(/ /gi,"_")
 url = url.replace(/-/gi,"_")
 url = url.replace(/,/gi,"_")
 url = url.replace(/'/gi,"_")
 url = url.replace(/\+/gi,"_")
 url = url.replace(/\//gi,"_")
return url;

//return escape(url);

	
}

function loadPage(url) {
 window.location.href = url;
}
function redirect(url) {
 window.location.href = url;
}
function reloadPage(querystringTackon) {

    var currentUrl = window.location.href;
//console.log(querystringTackon);

//console.log(currentUrl);
	//if (colrval.substr(0,1) == '#') { colrval = colrval.substr(1) ;}
        //on supprime les ancres
		if (currentUrl.indexOf("#") != -1	) {
			currentUrl = currentUrl.substr(0,currentUrl.indexOf("#"));
		}
                
    if (querystringTackon != null && querystringTackon.length > 0 && currentUrl.indexOf(querystringTackon) < 0) {
        if (currentUrl.indexOf("?") < 0)
            currentUrl += "?" + querystringTackon;
        else
            currentUrl += "&" + querystringTackon;
    }
	
//	console.log(currentUrl);

    window.location.href = currentUrl;
}

function online(contexte, id, div, e) {
e.preventDefault();
			ajax_send (URL_SITE+'zadmin/ajax/online.php',{"id":""+id+"","contexte":""+contexte+""}, div, new Array( "r_labo_online"));
			return false;
			
}
function r_labo_online (data, div) {
	////trace (data);
	////trace (div);
	$(div).find('img').remove();
//	$(div).find('img').attr('src',data.image);
        $(div).append('<i class="fa"></i>');
	$(div).find('i.fa').removeClass('fa-globe').removeClass('fa-circle').addClass(data.faclass);
	if (data.statut == 'online') {
//		$(div).find('img').attr('title','Statut : En ligne. Apparait sur votre site');
		$(div).find('i.fa').attr('title','Statut : En ligne. Apparait sur votre site');
	}
	if (data.statut == 'offline') {
//		$(div).find('img').attr('title','Statut : Hors ligne. n\'apparait pas sur votre site');
		$(div).find('i.fa').attr('title','Statut : Hors ligne. n\'apparait pas sur votre site');
	}
        
        


	if (data.refresh == 1) {
		reloadPage();
	}
}
function r_login (data, div) {
	if (data.success == 1 ) {
		$('#form_login').hide();
	}
}

function unsuppr(contexte, id, div) {
	
	//$(div).remove();
	if (confirm(CONFIRM_UNSUPPR)) 
	{
		ajax_send (URL_SITE+'zadmin/ajax/suppr.php?sens=undelete',{"id":""+id+"","contexte":""+contexte+""}, div, new Array( "r_suppr"));	
		return false;
	}
	
}
function suppr(contexte, id, div) {
	
	//$(div).remove();
	if (confirm(CONFIRM_SUPPR)) 
	{
		ajax_send (URL_SITE+'zadmin/ajax/suppr.php',{"id":""+id+"","contexte":""+contexte+""}, div, new Array( "r_suppr"));	
		return false;
	}
	
}
function reactive(contexte, id, div) {
	
	//$(div).remove();
	if (confirm('reactive ?')) 
	{
		ajax_send (URL_SITE+'zadmin/ajax/reactive.php',{"id":""+id+"","contexte":""+contexte+""}, div, new Array( "r_suppr"));	
		return false;
	}
	
}
function r_suppr(data, div) {
	if (data.success == 1) {
		$(div).parents('tr').remove();
	} else {
		$(div).html(data.msg);
	}
	if (data.refresh == 1) {
		reloadPage();
	}
}

function add_medecin_video(id, nom,e) {
	$('#medecins_video').append('<div><input type="hidden" value="'+id+'" name="medecins[]" />'+nom+'<img align="absmiddle"src="'+URL_SITE+'images/icons/icodelete.gif" onclick="$(this).parent().remove();"/></div>');
	e.preventDefault();
}
function add_produit_video(id, nom,e) {
	$('#produits_video').append('<div><input type="hidden" value="'+id+'" name="produits[]" />'+nom+'<img align="absmiddle"src="'+URL_SITE+'images/icons/icodelete.gif" onclick="$(this).parent().remove();"/></div>');
	e.preventDefault();
}

function load_video_toolbox(idToolbox) {
	ajax_send (URL_SITE+'zadmin/ajax/load_video_toolbox.php',{"idToolbox":""+idToolbox+""}, '#r_search_produits', new Array( "see_response"));	
		
	
}


//connexion d'un membre
function mdpoubli_user(rep) {
	//on vire les input de traduction au cas ou
		 $('form[rel="frm_boxmdpoubli"]').find('input.inputtrad').remove();
		 trace ($('form[rel="frm_boxmdpoubli"]'));
		//on ajoute le produit à l'item idphotochapitre
		if ($('form[rel="frm_boxmdpoubli"]').hasClass('loginComnco')) {
			//ajout de la variable
			oublicco = '?cco=1';
		} else {
			oublicco = '';
		}
		ajax_send (URL_SITE+'ajax/mod_users/mdpoubli.php'+oublicco,$('form[rel="frm_boxmdpoubli"]').serialize(), rep, new Array( "see_response")); 
}

function r_connect_user (data, div) {
	if (data.success == 1) {
			reloadPage();
	}
}
//connexion d'un membre
function disconnect_user(id) {
//connexion d'un membre
	ajax_send (URL_SITE+'ajax/mod_users/disconnect_user.php','', '#'+id, new Array( "see_response", 'r_connect_user'));
}
function connect_user( id) {
//trace (id);
	//on vire les input de traduction au cas ou
		 $('#frm_connexion').add('form.sc_frm_login').find('input.inputtrad').remove();
			
			if ( $('#'+id).hasClass('loginComnco')) {			
				ajax_send (URL_SITE+'ajax/mod_users/connect_user_comnco.php',$('#'+id).serialize(), '#r_'+id, new Array( "see_response", 'r_connect_user')); 
			} else {
				ajax_send (URL_SITE+'ajax/mod_users/connect_user.php',$('#'+id).serialize(), '#r_'+id, new Array( "see_response", 'r_connect_user')); 
			}
}

/*************************************************


DOCUMENT

*******************************************************/
/********************************************************************************************************************************************/

 $(document).ready(function(){
 
	 /*
 $('*').click(function() {
	trace ($(this).context.nodeName.toLowerCase()+'.'+$(this).attr('class'));

 });
 */
 //connexion utilisateur membre du site
	 $('form.frm_connexion').add('form.sc_frm_login').submit(function(e) {
			connect_user($(this).attr('id'));		
			return false;	
			e.preventDefault();
    });
	
	//deconnexion utilisateur membre du site
	 $('.lnk_deconnexion').click(function(e) {
			disconnect_user($(this).attr('id'));		
			return false;	
			e.preventDefault();
    });
	
	//oubli membre du site
	 $('form.boxmdpoubli').add('form#boxmdpoubli').add('form[rel="frm_boxmdpoubli"]').submit(function(e) {			
			rep = $(this).attr('data-rep');
			mdpoubli_user(rep);		
			return false;	
    });
	
	
 /*
$('*').mouseover(function(event) {
	arrparents = Array();
	$(this).parents().each(function(index) {
		tag = this.tagName ;
		classp = $(this).attr('class');
		if (classp != undefined) {
			tag = tag+'.'+classp;
		}
		arrparents.unshift(tag); 
	});
	trace (arrparents.join(' '));
	event.stopPropagation();

});
 */
 $('input.number').keyup(function(){ 
	$(this).val(numeric($(this).val()));
 });
 


 
 
  $('table.colorize tbody tr:nth-child(even)').addClass('even');
  $('table.colorize tbody tr:nth-child(odd)').addClass('odd');
 
 if ($('input.datepicker').length >0) {
  $( "input.datepicker" ).datepicker({'dateFormat':'yy-mm-dd'});
}
 if ($('input.datetimepicker').length >0) {
$("input.datetimepicker").datetimepicker({'dateFormat':'yy-mm-dd'}); 
}
  // pour la soumission des formulaires
 $('form').submit(function(e) {
	
	//on supprime tous les input de traduction masqués avant d'envoyer un form
	$(this).find('input.inputtrad').remove();
	
	myform = $(this);
	
	
	//MAJ des ckeditor ajax	
	$(this).find('textarea.jsckeditor').each(function() {
		$(this).show().css('visibility','visible');
		
		
		var editor = $(this).ckeditorGet();
	//	//trace( editor );
		data = editor.getData();
			
		name = $(this).attr('name');
		$('textarea [name="'+name+'"]').remove();
		$(this).remove();
		$(myform).append('<textarea name="'+name+'" class="hidden">'+data+'</textarea>');
		
	//return false;
	//e.preventDefault();	
		
	});
	
	
	//return false;
	
});
//$('textarea').val('test de data');
  
   
    if ($('div.tabs').length >0) {
   $('div.tabs').tabs();
}
    if ($('textarea.jsckeditor').length >0) {
    $('textarea.jsckeditor').livequery(function(){ 
		activeCKEDITOR();
   });
   }

   if ($('.slider').length >0) {
   $('.slider').livequery(function(){ 
    
		val = $(this).attr('rel');
		vmax = $(this).find('.slidebar').attr('rel');
		$(this).find(".amount" ).val(val);
		
		$(this).find('.slidebar').slider({
			value:val ,
			min: 0,
			max: vmax,			
			slide: function( event, ui ) {
				$(this).parent().find(".amount" ).val(  ui.value );
			}
		});
	
    }); 
 }
	
		
    if ($('.slider_nbLines').length >0) {  
   $( ".slider_nbLines" ).slider({
			
			min: 1,
			max: 50,
			stop: function( event, ui ) {
				ajax_send (URL_SITE+'zadmin/ajax/table_nbLines.php',{"nbLignes":""+ui.value+"","nomTableau":""+$(this).attr('rel')+""}, '#ajax_rep_'+$(this).attr('rel'), new Array("see_response", "r_slider_lines"));
			},
			slide: function( event, ui ) {
				
				$( '#lines_'+$(this).attr('rel') ).val(  ui.value );
			},
			create: function(event, ui) { 
				//on place le curseur
				$(this).slider( "option" , 'value' , $(this).parent().attr('rel') );
			}
		});

  }



    if ($('table.tablesorter').length >0) {  


    $('table.tablesorter').tablesorter(); 
}


if ($('div.tableau_menu input.search').length >0) {	
	$('div.tableau_menu input.search').live('keypress', function(e) {		
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13)  {
				//on génère un formulaire avec la recherche et on le poste
				 frm = '<form style="display:none;" id="search_'+$(this).attr('rel')+'" action="" method="post">';
				 frm += '<input type="hidden" name="'+$(this).attr('name')+'" value="'+$(this).val()+'" />';
				 frm += '</form>';
				 $('body').append(frm);
				 $('#search_'+$(this).attr('rel')).submit();
				 e.preventDefault();	
			}  
		
     });
}


if ($('search_medecins').length >0) {		
	$('#search_medecins').live('keypress', function(e) {		
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13)  {
				ajax_send (URL_SITE+'zadmin/ajax/medecin_video.php',{"search":""+$(this).val()+""}, '#r_search_medecins', new Array("see_response") );	
				 e.preventDefault();
			}    
     });

}
if ($('search_produits').length >0) {		
	 $('#search_produits').live('keypress', function(e) {		
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13)  {
				ajax_send (URL_SITE+'zadmin/ajax/produits_video.php',{"search":""+$(this).val()+""}, '#r_search_produits', new Array("see_response") );	
				 e.preventDefault();
			}    
     });
	
}	
   

if ($('span.trad').length >0) {	
   $('span.trad').live('dblclick', function(e) {
		//$(this).css('color','green');
		
		$(this).find('span').show();
		 e.preventDefault();
		 
	}); 
}
	
if ($('input.inputtrad').length >0) {		
	$('input.inputtrad').live('keypress', function(e) {		
            code= (e.keyCode ? e.keyCode : e.which);
            if (code == 13)  {
				//la div de retour est un span qui a pour rel le nom du label + l'id langue
				ajax_send (URL_SITE+'zadmin/ajax/label.php',{"label":""+$(this).attr('name')+"","message":""+$(this).val()+"","idLangue":""+$(this).attr('rel')+""}, 'span[rel='+$(this).attr('name')+$(this).attr('rel')+']', new Array("see_response") );	
				
			}
           
     });
}
		
		
		
 $('#form_login').submit(function(e) {
		ajax_send (URL_SITE+'ajax/login.php',$(this).serialize(), '#r_form_login', new Array("see_response","r_login") );	
		e.preventDefault();
		return false;
});
		
		

   
  // ajax_send ('ajax/del_gest_for_mgr.php',{"uti_gests":""+IdUti+"","idtr":""+idtr+""}, 'span#r_ajax_tab_uti_gest_for_mgr', new Array("see_response", "r_del_gest_for_mgr") );	
//  ajax_send ('ajax/filter_contact.php',$('form#from_new_msg').serialize(), "div#r_filter_contact", new Array("see_response") );
		
		/********** video watch ******/
		
		$('#show_add_comment').live('click', function(e) {		
           $('form#add_comment').show();
		   $(this).hide();
           		e.preventDefault();
			return false;
     });
		
		
	$('input.email').blur(function(){//When they tab/click out of the field...
		if(!is_email($(this).val())){//If the email field's value is NOT a valid email...
			$(this).removeClass('good').addClass('error'); //Remove "good" class if exists, and add error class
		} 	else{
			$(this).removeClass('error').addClass('good'); //If it's a valid email, remove error class and add good class
		}
	});
		
	$('input.password').keyup(function(){//When they tab/click out of the field...
	
	if ( endsWith($(this).attr('name'), '2') ) {
		text = $(this).attr('name').substring(0, ($(this).attr('name').length-1));
		field2 = 'input[name='+text+']' ;
	} else {
		field2 = 'input[name='+$(this).attr('name')+'2'+']' ;
	}
	
		if( $(field2).val() != $(this).val() ){
			$(this).add(field2).removeClass('good').addClass('error');
		} 	else{
			$(this).add(field2).removeClass('error').addClass('good'); 
		}
	});
	
	
	
	/*************** formayulaire regiuster ********/
	$('form#register').submit(function(e) {
		 options = {};
		error = 0;
		if(!is_email($('#email').val())){
			error = 1;		
			$('#email').effect('shake', options, 50);
		}
		
		if ($('#nom').val() == ''  ) {
			error = 1;	
			$('#nom').effect('shake', options, 50);
		}
		if ( $('#prenom').val() == '' ) {
			error = 1;	
			$('#prenom').effect('shake', options, 50);
		}
		
		if ($('#pass').val() != $('#pass2').val() ) {
			error = 1;	
			$('#pass').add('#pass2').effect('shake', options, 50);
		}
		
		

		if ($('#certif:checked').length != 1) {
			error = 1;	
			$('#certif').effect('shake', options, 50);
		}
		
		if (error == 1) {			
			$('#error_register').effect('shake', options, 50).delay(2000).slideUp(200);
			return false;
			 e.preventDefault();
			
		}
		
		
		
	});
	
	
	

	//nivolsider
	

	if ($('#nivoslider').size() >0) {
            $('#nivoslider').each(function() {
                pztime = $(this).attr('data-pausetime');
                if (!$.isNumeric(pztime)) {
                    pztime = 3500;
                }
                 $(this).nivoSlider({pauseTime:pztime});
            });
	
	}
	
	if ($('.colorSelector').length >0) {
	 $('.colorSelector').livequery(function(){ 	
	$(this).ColorPicker({
		color: $(this).find('input').val(),
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			var elem = ($(this).find('div').attr('rel'));
			$(colpkr).attr('rel', elem);
			//trace( $(this).find('input').val() );
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {			
			elm = ($(this).attr('rel'));
			////trace(elm);
			$('#'+elm).find('div').css('backgroundColor', '#' + hex);
			
			colrval = $('#'+elm).find('input').val( hex);
			if (colrval.substr(0,1) == '#') { colrval = colrval.substr(1) ;}
			
			$('#'+elm).find('input').val( colrval);
		},
		onSubmit: function(hsb, hex, rgb, el) {
		$(el).val(hex);
		$(el).ColorPickerHide();
		}
	});
	});

	}
	
	if ($(".selectul").length >0) {
	$(".selectul").selectul();
	}






		
 });