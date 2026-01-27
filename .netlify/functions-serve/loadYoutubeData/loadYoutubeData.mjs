
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// .netlify/functions/loadYoutubeData.mts
var loadYoutubeData_default = async (req, context) => {
  try {
    let parseDuration2 = function(duration) {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      if (!match) return 0;
      const hours = parseInt(match[1]) || 0;
      const minutes = parseInt(match[2]) || 0;
      const seconds = parseInt(match[3]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    };
    var parseDuration = parseDuration2;
    const apiKey = Netlify.env.get("API_KEY");
    const channelId = req.url ? new URL(req.url).searchParams.get("channelId") : null;
    if (!channelId) {
      throw new Error("Channel ID is required");
    }
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found");
    }
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&key=${apiKey}`;
    const playlistResponse = await fetch(playlistUrl);
    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items.map((item) => item.snippet.resourceId.videoId).join(",");
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();
    const videos = playlistData.items.map((item, index) => {
      const videoId = item.snippet.resourceId.videoId;
      const videoDetails = videosData.items.find((v) => v.id === videoId);
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
        durationInSeconds: videoDetails ? parseDuration2(videoDetails.contentDetails.duration) : 0
      };
    }).filter((video) => video.durationInSeconds > 60).slice(0, 3);
    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
export {
  loadYoutubeData_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLm5ldGxpZnkvZnVuY3Rpb25zL2xvYWRZb3V0dWJlRGF0YS5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgQ29udGV4dCB9IGZyb20gXCJAbmV0bGlmeS9mdW5jdGlvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcTogUmVxdWVzdCwgY29udGV4dDogQ29udGV4dCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGFwaUtleSA9IE5ldGxpZnkuZW52LmdldChcIkFQSV9LRVlcIik7XG4gICAgY29uc3QgY2hhbm5lbElkID0gcmVxLnVybFxuICAgICAgPyBuZXcgVVJMKHJlcS51cmwpLnNlYXJjaFBhcmFtcy5nZXQoXCJjaGFubmVsSWRcIilcbiAgICAgIDogbnVsbDtcblxuICAgIGlmICghY2hhbm5lbElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFubmVsIElEIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cblxuICAgIC8vIEdldCBjaGFubmVsIGRldGFpbHMgYW5kIHVwbG9hZHMgcGxheWxpc3QgSURcbiAgICBjb25zdCBjaGFubmVsVXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvY2hhbm5lbHM/cGFydD1jb250ZW50RGV0YWlscyZpZD0ke2NoYW5uZWxJZH0ma2V5PSR7YXBpS2V5fWA7XG4gICAgY29uc3QgY2hhbm5lbFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goY2hhbm5lbFVybCk7XG4gICAgY29uc3QgY2hhbm5lbERhdGEgPSBhd2FpdCBjaGFubmVsUmVzcG9uc2UuanNvbigpO1xuXG4gICAgaWYgKCFjaGFubmVsRGF0YS5pdGVtcyB8fCBjaGFubmVsRGF0YS5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYW5uZWwgbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHVwbG9hZHNQbGF5bGlzdElkID1cbiAgICAgIGNoYW5uZWxEYXRhLml0ZW1zWzBdLmNvbnRlbnREZXRhaWxzLnJlbGF0ZWRQbGF5bGlzdHMudXBsb2FkcztcblxuICAgIC8vIEdldCB0aGUgbGFzdCAxMCB2aWRlb3NcbiAgICBjb25zdCBwbGF5bGlzdFVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3BsYXlsaXN0SXRlbXM/cGFydD1zbmlwcGV0JnBsYXlsaXN0SWQ9JHt1cGxvYWRzUGxheWxpc3RJZH0mbWF4UmVzdWx0cz0xMCZrZXk9JHthcGlLZXl9YDtcbiAgICBjb25zdCBwbGF5bGlzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocGxheWxpc3RVcmwpO1xuICAgIGNvbnN0IHBsYXlsaXN0RGF0YTogeyBpdGVtczogYW55W10gfSA9IGF3YWl0IHBsYXlsaXN0UmVzcG9uc2UuanNvbigpO1xuXG4gICAgLy8gRXh0cmFjdCB2aWRlbyBJRHNcbiAgICBjb25zdCB2aWRlb0lkcyA9IHBsYXlsaXN0RGF0YS5pdGVtc1xuICAgICAgLm1hcChpdGVtID0+IGl0ZW0uc25pcHBldC5yZXNvdXJjZUlkLnZpZGVvSWQpXG4gICAgICAuam9pbihcIixcIik7XG5cbiAgICAvLyBHZXQgZGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlc2UgdmlkZW9zXG4gICAgY29uc3QgdmlkZW9zVXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zP3BhcnQ9c3RhdGlzdGljcyxjb250ZW50RGV0YWlscyZpZD0ke3ZpZGVvSWRzfSZrZXk9JHthcGlLZXl9YDtcbiAgICBjb25zdCB2aWRlb3NSZXNwb25zZSA9IGF3YWl0IGZldGNoKHZpZGVvc1VybCk7XG4gICAgY29uc3QgdmlkZW9zRGF0YTogeyBpdGVtczogYW55W10gfSA9IGF3YWl0IHZpZGVvc1Jlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IElTTyA4NjAxIGR1cmF0aW9uIHRvIHNlY29uZHNcbiAgICBmdW5jdGlvbiBwYXJzZUR1cmF0aW9uKGR1cmF0aW9uOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZHVyYXRpb24ubWF0Y2goL1BUKFxcZCtIKT8oXFxkK00pPyhcXGQrUyk/Lyk7XG5cbiAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICBjb25zdCBob3VycyA9IHBhcnNlSW50KG1hdGNoWzFdKSB8fCAwO1xuICAgICAgY29uc3QgbWludXRlcyA9IHBhcnNlSW50KG1hdGNoWzJdKSB8fCAwO1xuICAgICAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzNdKSB8fCAwO1xuXG4gICAgICByZXR1cm4gaG91cnMgKiAzNjAwICsgbWludXRlcyAqIDYwICsgc2Vjb25kcztcbiAgICB9XG5cbiAgICAvLyBDb21iaW5lIHRoZSBkYXRhXG4gICAgY29uc3QgdmlkZW9zID0gcGxheWxpc3REYXRhLml0ZW1zXG4gICAgICAubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB2aWRlb0lkID0gaXRlbS5zbmlwcGV0LnJlc291cmNlSWQudmlkZW9JZDtcbiAgICAgICAgY29uc3QgdmlkZW9EZXRhaWxzID0gdmlkZW9zRGF0YS5pdGVtcy5maW5kKHYgPT4gdi5pZCA9PT0gdmlkZW9JZCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2aWRlb0lkLFxuICAgICAgICAgIHRpdGxlOiBpdGVtLnNuaXBwZXQudGl0bGUsXG4gICAgICAgICAgcHVibGlzaGVkQXQ6IGl0ZW0uc25pcHBldC5wdWJsaXNoZWRBdCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5zbmlwcGV0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHRodW1ibmFpbDogaXRlbS5zbmlwcGV0LnRodW1ibmFpbHMubWVkaXVtLnVybCxcbiAgICAgICAgICB1cmw6IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7dmlkZW9JZH1gLFxuICAgICAgICAgIHZpZXdDb3VudDogdmlkZW9EZXRhaWxzID8gdmlkZW9EZXRhaWxzLnN0YXRpc3RpY3Mudmlld0NvdW50IDogXCJOL0FcIixcbiAgICAgICAgICBsaWtlQ291bnQ6IHZpZGVvRGV0YWlscyA/IHZpZGVvRGV0YWlscy5zdGF0aXN0aWNzLmxpa2VDb3VudCA6IFwiTi9BXCIsXG4gICAgICAgICAgZHVyYXRpb246IHZpZGVvRGV0YWlscyA/IHZpZGVvRGV0YWlscy5jb250ZW50RGV0YWlscy5kdXJhdGlvbiA6IFwiTi9BXCIsXG4gICAgICAgICAgZHVyYXRpb25JblNlY29uZHM6IHZpZGVvRGV0YWlsc1xuICAgICAgICAgICAgPyBwYXJzZUR1cmF0aW9uKHZpZGVvRGV0YWlscy5jb250ZW50RGV0YWlscy5kdXJhdGlvbilcbiAgICAgICAgICAgIDogMFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIodmlkZW8gPT4gdmlkZW8uZHVyYXRpb25JblNlY29uZHMgPiA2MCkgLy8gRmlsdGVyIG91dCB2aWRlb3MgNjAgc2Vjb25kcyBvciBsZXNzXG4gICAgICAuc2xpY2UoMCwgMyk7IC8vIFRha2Ugb25seSB0aGUgZmlyc3QgNSByZWd1bGFyIHZpZGVvc1xuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh2aWRlb3MpLCB7XG4gICAgICBzdGF0dXM6IDIwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pLCB7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjog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
