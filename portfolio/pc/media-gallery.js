document.querySelectorAll('.media-gallery').forEach(gallery => {
    const video = gallery.querySelector('.media-video');
    const image = gallery.querySelector('.media-image');
    const playback = gallery.querySelector('.media-playback');
    const caption = gallery.querySelector('.media-caption');
    const thumbnails = [...gallery.querySelectorAll('.media-thumbnail')];

    const updatePlayback = () => {
        playback.textContent = video.paused ? 'Play' : 'Pause';
        playback.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} video`);
    };

    const playVideo = () => video.play().catch(updatePlayback);

    const selectMedia = selected => {
        const isVideo = selected.dataset.kind === 'video';
        const hasControls = selected.dataset.controls === 'true';

        thumbnails.forEach(button => {
            button.setAttribute('aria-pressed', String(button === selected));
        });
        video.hidden = !isVideo;
        playback.hidden = !isVideo || hasControls;
        image.hidden = isVideo;

        if (caption) {
            caption.textContent = selected.dataset.caption || '';
            caption.hidden = !caption.textContent;
        }

        if (isVideo) {
            video.controls = hasControls;
            video.autoplay = !hasControls;
            video.muted = !hasControls;
            video.loop = !hasControls;
            video.setAttribute('aria-label', selected.dataset.alt);
            if (video.getAttribute('src') !== selected.dataset.src) {
                video.src = selected.dataset.src;
            }
            video.poster = selected.dataset.poster || '';
            if (!hasControls) playVideo();
        } else {
            video.pause();
            image.alt = selected.dataset.alt;
            if (image.getAttribute('src') !== selected.dataset.src) {
                image.src = selected.dataset.src;
            }
        }
    };

    thumbnails.forEach((button, index) => {
        button.addEventListener('click', () => selectMedia(button));
        button.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % thumbnails.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + thumbnails.length) % thumbnails.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = thumbnails.length - 1;
            if (next === undefined) return;
            event.preventDefault();
            thumbnails[next].focus();
            selectMedia(thumbnails[next]);
        });
    });

    playback.addEventListener('click', () => {
        if (video.paused) playVideo();
        else video.pause();
    });
    video.addEventListener('play', updatePlayback);
    video.addEventListener('pause', updatePlayback);
    updatePlayback();
    selectMedia(thumbnails.find(button => button.getAttribute('aria-pressed') === 'true') || thumbnails[0]);
});
