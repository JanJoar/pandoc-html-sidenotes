if (window.matchMedia("(min-width: 768px)").matches) {
    // JavaScript for non-mobile devices
    $(document).ready(function(){
        let sidenoteCounter = 1;  // Initialize the sidenote counter
        $(".footdef").each(function() {
            var $footnote = $(this);
            var id = $footnote.find("a.footnum").attr("id");

            if (!id) {
                console.warn("Footnote missing ID:", $footnote);
                return;
            }

            var footnoteContent = $footnote.find(".footpara").html();

            // Create a new sidenote with the content and apply the sidenote-number class
            var newFootnote = `
                <span class="sidenote" style="counter-increment: sidenote-counter ${sidenoteCounter};">
                    ${footnoteContent}
                </span>`;

            // Find the corresponding anchor for the footnote reference and insert the sidenote
            var $anchor = $(`a[href='#${id}']`);
            if ($anchor.length) {
                $anchor.after(newFootnote); // Insert the sidenote after the reference
                $anchor.attr("href", "#" + id.replace('fn', 'fnr')); // Update the reference href to the new footnote ID
            } else {
                console.warn(`No anchor found for footnote ID: ${id}`);
            }

            // Increment the sidenote counter for the next sidenote
            sidenoteCounter++;

            $footnote.remove(); // Remove the original footnote content
        });

        // Check if any sidenotes were added and hide the "Footnotes:" header
        if ($(".sidenote").length > 0) {
            $("h2.footnotes").hide();  // Hide the "Footnotes:" header
        }
    });
} else {
    console.log("Script skipped on mobile devices.");
}
