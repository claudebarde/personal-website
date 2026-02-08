
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// .netlify/functions/loadYoutubeData.mts
var loadYoutubeData_default = async (req, _context) => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLm5ldGxpZnkvZnVuY3Rpb25zL2xvYWRZb3V0dWJlRGF0YS5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgQ29udGV4dCB9IGZyb20gXCJAbmV0bGlmeS9mdW5jdGlvbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcTogUmVxdWVzdCwgX2NvbnRleHQ6IENvbnRleHQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBhcGlLZXkgPSBOZXRsaWZ5LmVudi5nZXQoXCJBUElfS0VZXCIpO1xuICAgIGNvbnN0IGNoYW5uZWxJZCA9IHJlcS51cmxcbiAgICAgID8gbmV3IFVSTChyZXEudXJsKS5zZWFyY2hQYXJhbXMuZ2V0KFwiY2hhbm5lbElkXCIpXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAoIWNoYW5uZWxJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hhbm5lbCBJRCBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgY2hhbm5lbCBkZXRhaWxzIGFuZCB1cGxvYWRzIHBsYXlsaXN0IElEXG4gICAgY29uc3QgY2hhbm5lbFVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL2NoYW5uZWxzP3BhcnQ9Y29udGVudERldGFpbHMmaWQ9JHtjaGFubmVsSWR9JmtleT0ke2FwaUtleX1gO1xuICAgIGNvbnN0IGNoYW5uZWxSZXNwb25zZSA9IGF3YWl0IGZldGNoKGNoYW5uZWxVcmwpO1xuICAgIGNvbnN0IGNoYW5uZWxEYXRhID0gYXdhaXQgY2hhbm5lbFJlc3BvbnNlLmpzb24oKTtcblxuICAgIGlmICghY2hhbm5lbERhdGEuaXRlbXMgfHwgY2hhbm5lbERhdGEuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFubmVsIG5vdCBmb3VuZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGxvYWRzUGxheWxpc3RJZCA9XG4gICAgICBjaGFubmVsRGF0YS5pdGVtc1swXS5jb250ZW50RGV0YWlscy5yZWxhdGVkUGxheWxpc3RzLnVwbG9hZHM7XG5cbiAgICAvLyBHZXQgdGhlIGxhc3QgMTAgdmlkZW9zXG4gICAgY29uc3QgcGxheWxpc3RVcmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9wbGF5bGlzdEl0ZW1zP3BhcnQ9c25pcHBldCZwbGF5bGlzdElkPSR7dXBsb2Fkc1BsYXlsaXN0SWR9Jm1heFJlc3VsdHM9MTAma2V5PSR7YXBpS2V5fWA7XG4gICAgY29uc3QgcGxheWxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoKHBsYXlsaXN0VXJsKTtcbiAgICBjb25zdCBwbGF5bGlzdERhdGE6IHsgaXRlbXM6IGFueVtdIH0gPSBhd2FpdCBwbGF5bGlzdFJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIEV4dHJhY3QgdmlkZW8gSURzXG4gICAgY29uc3QgdmlkZW9JZHMgPSBwbGF5bGlzdERhdGEuaXRlbXNcbiAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLnNuaXBwZXQucmVzb3VyY2VJZC52aWRlb0lkKVxuICAgICAgLmpvaW4oXCIsXCIpO1xuXG4gICAgLy8gR2V0IGRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZXNlIHZpZGVvc1xuICAgIGNvbnN0IHZpZGVvc1VybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz9wYXJ0PXN0YXRpc3RpY3MsY29udGVudERldGFpbHMmaWQ9JHt2aWRlb0lkc30ma2V5PSR7YXBpS2V5fWA7XG4gICAgY29uc3QgdmlkZW9zUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh2aWRlb3NVcmwpO1xuICAgIGNvbnN0IHZpZGVvc0RhdGE6IHsgaXRlbXM6IGFueVtdIH0gPSBhd2FpdCB2aWRlb3NSZXNwb25zZS5qc29uKCk7XG5cbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCBJU08gODYwMSBkdXJhdGlvbiB0byBzZWNvbmRzXG4gICAgZnVuY3Rpb24gcGFyc2VEdXJhdGlvbihkdXJhdGlvbjogc3RyaW5nKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGR1cmF0aW9uLm1hdGNoKC9QVChcXGQrSCk/KFxcZCtNKT8oXFxkK1MpPy8pO1xuXG4gICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgY29uc3QgaG91cnMgPSBwYXJzZUludChtYXRjaFsxXSkgfHwgMDtcbiAgICAgIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChtYXRjaFsyXSkgfHwgMDtcbiAgICAgIGNvbnN0IHNlY29uZHMgPSBwYXJzZUludChtYXRjaFszXSkgfHwgMDtcblxuICAgICAgcmV0dXJuIGhvdXJzICogMzYwMCArIG1pbnV0ZXMgKiA2MCArIHNlY29uZHM7XG4gICAgfVxuXG4gICAgLy8gQ29tYmluZSB0aGUgZGF0YVxuICAgIGNvbnN0IHZpZGVvcyA9IHBsYXlsaXN0RGF0YS5pdGVtc1xuICAgICAgLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgdmlkZW9JZCA9IGl0ZW0uc25pcHBldC5yZXNvdXJjZUlkLnZpZGVvSWQ7XG4gICAgICAgIGNvbnN0IHZpZGVvRGV0YWlscyA9IHZpZGVvc0RhdGEuaXRlbXMuZmluZCh2ID0+IHYuaWQgPT09IHZpZGVvSWQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmlkZW9JZCxcbiAgICAgICAgICB0aXRsZTogaXRlbS5zbmlwcGV0LnRpdGxlLFxuICAgICAgICAgIHB1Ymxpc2hlZEF0OiBpdGVtLnNuaXBwZXQucHVibGlzaGVkQXQsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uc25pcHBldC5kZXNjcmlwdGlvbixcbiAgICAgICAgICB0aHVtYm5haWw6IGl0ZW0uc25pcHBldC50aHVtYm5haWxzLm1lZGl1bS51cmwsXG4gICAgICAgICAgdXJsOiBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke3ZpZGVvSWR9YCxcbiAgICAgICAgICB2aWV3Q291bnQ6IHZpZGVvRGV0YWlscyA/IHZpZGVvRGV0YWlscy5zdGF0aXN0aWNzLnZpZXdDb3VudCA6IFwiTi9BXCIsXG4gICAgICAgICAgbGlrZUNvdW50OiB2aWRlb0RldGFpbHMgPyB2aWRlb0RldGFpbHMuc3RhdGlzdGljcy5saWtlQ291bnQgOiBcIk4vQVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiB2aWRlb0RldGFpbHMgPyB2aWRlb0RldGFpbHMuY29udGVudERldGFpbHMuZHVyYXRpb24gOiBcIk4vQVwiLFxuICAgICAgICAgIGR1cmF0aW9uSW5TZWNvbmRzOiB2aWRlb0RldGFpbHNcbiAgICAgICAgICAgID8gcGFyc2VEdXJhdGlvbih2aWRlb0RldGFpbHMuY29udGVudERldGFpbHMuZHVyYXRpb24pXG4gICAgICAgICAgICA6IDBcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKHZpZGVvID0+IHZpZGVvLmR1cmF0aW9uSW5TZWNvbmRzID4gNjApIC8vIEZpbHRlciBvdXQgdmlkZW9zIDYwIHNlY29uZHMgb3IgbGVzc1xuICAgICAgLnNsaWNlKDAsIDMpOyAvLyBUYWtlIG9ubHkgdGhlIGZpcnN0IDUgcmVndWxhciB2aWRlb3NcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkodmlkZW9zKSwge1xuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSwge1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6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
