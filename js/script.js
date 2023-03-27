expandNavigation();
jsSelector();
jsGallery();

function expandNavigation() {
    var nav = document.getElementsByTagName("nav")[0];
    var navExpand = nav.children[0];
    var navOptions = nav.children[1];

    navExpand.addEventListener('click', (e) => {
        if(navExpand.classList.contains("active")) {
            navOptions.classList.remove("active");
            navExpand.classList.remove("active");
        }
        else {
            navOptions.classList.add("active");
            navExpand.classList.add("active");
        }
    });
}

function jsSelector() {
    var selectors = document.getElementsByClassName("js-selector");

    if(selectors.length < 1) return;

    for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        var options = document.createElement("div");
        options.classList.add("js-selector__options");
        for (let j = 0; j < selector.children.length; j++) {
            const child = selector.children[j];
            if (j == 0) child.classList.add("active");
            var targetId = child.attributes.getNamedItem("js-selector-id").value;
            var option = document.createElement("div");
            option.innerHTML = targetId;
            option.classList.add("js-selector__option");
            option.addEventListener('click', (e) => {
                var targetId = e.target.innerHTML;

                for (let x = 0; x < selector.children.length; x++) {
                    const child = selector.children[x];
                    if(child.hasAttribute("js-selector-id")) {
                        if(targetId == child.attributes.getNamedItem("js-selector-id").value) {
                            child.classList.add("active");
                        }
                        else if (child.classList.contains("active")){
                            child.classList.remove("active");
                        }
                    }
                }
            });
            options.appendChild(option);
        }
        selector.prepend(options);
    }
}

function jsGallery() {
    var galleries = document.getElementsByClassName("js-gallery");
    
    galleries.length

    if(galleries.length < 1) return;

    for (let i = 0; i < galleries.length; i++) {
        const gallery = galleries[i];
        
        for (let i = 0; i < gallery.children.length; i++) {
            const el = gallery.children[i];
            
            if (i != 0 ) el.classList.add("hidden");
        }

        var options = document.createElement("div");
        options.classList.add("js-gallery__options");

        var prev = document.createElement("span");
        prev.classList.add("material-symbols-outlined")
        prev.innerText = "arrow_right_alt";
        var next = document.createElement("span");
        next.classList.add("material-symbols-outlined")
        next.innerText = "arrow_right_alt";

        options.append(prev);
        options.append(next);
        gallery.append(options);

        prev.classList.add("hidden");
        if(gallery.children.length < 3) next.classList.add("hidden");

        prev.addEventListener('click', (e) => {
            for (let j = 0; j < gallery.children.length; j++) {
                const el = gallery.children[j];

                if(el.classList.contains("js-gallery__options")) continue;
                
                if(!el.classList.contains('hidden') && j-1 >= 0) {
                    el.classList.add('hidden');
                    gallery.children[j-1].classList.remove('hidden');
                    if (j-2 < 0) prev.classList.add("hidden");
                    if (!gallery.children[j].classList.contains("js-gallery__options")) next.classList.remove("hidden")
                    return;
                }
            }
        });

        next.addEventListener('click', (e) => {
            for (let j = 0; j < gallery.children.length; j++) {
                const el = gallery.children[j];

                if(el.classList.contains("js-gallery__options")) continue;
                
                if(!el.classList.contains('hidden') && !gallery.children[j+1].classList.contains("js-gallery__options")) {
                    el.classList.add('hidden');
                    gallery.children[j+1].classList.remove('hidden');
                    if (j-1 < 0) prev.classList.remove("hidden");
                    if (gallery.children[j+2].classList.contains("js-gallery__options")) next.classList.add("hidden");
                    return;
                }
            }
        });
    }
}