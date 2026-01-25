import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const apiKey = Netlify.env.get("API_KEY");
    const channelId = Netlify.env.get("CHANNEL_ID");

    // Get channel details and uploads playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found");
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Get the last 10 videos
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`;
    const playlistResponse = await fetch(playlistUrl);
    const playlistData: { items: any[] } = await playlistResponse.json();

    // Extract video IDs
    const videoIds = playlistData.items
      .map(item => item.snippet.resourceId.videoId)
      .join(",");

    // Get detailed information about these videos
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    const videosData: { items: any[] } = await videosResponse.json();

    // Helper function to convert ISO 8601 duration to seconds
    function parseDuration(duration: string) {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

      if (!match) return 0;

      const hours = parseInt(match[1]) || 0;
      const minutes = parseInt(match[2]) || 0;
      const seconds = parseInt(match[3]) || 0;

      return hours * 3600 + minutes * 60 + seconds;
    }

    // Combine the data
    const videos = playlistData.items
      .map((item, index) => {
        const videoId = item.snippet.resourceId.videoId;
        const videoDetails = videosData.items.find(v => v.id === videoId);

        return {
          videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          viewCount: videoDetails ? videoDetails.statistics.viewCount : "N/A",
          likeCount: videoDetails ? videoDetails.statistics.likeCount : "N/A",
          duration: videoDetails ? videoDetails.contentDetails.duration : "N/A",
          durationInSeconds: videoDetails
            ? parseDuration(videoDetails.contentDetails.duration)
            : 0
        };
      })
      .filter(video => video.durationInSeconds > 60) // Filter out videos 60 seconds or less
      .slice(0, 3); // Take only the first 5 regular videos

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
