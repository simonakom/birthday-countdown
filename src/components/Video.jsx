export default function Video() {
    return (
      <div className="video">
      <iframe 
        width="960" 
        height="750" 
        src="https://www.youtube.com/embed/Jguqnlymeuk?si=W98ONFXeXBGXVLqp&autoplay=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
      </div>
    );
  }