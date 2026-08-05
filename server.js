const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/events", async (req, res) => {
    const apiUrl =
        "https://ll.thespacedevs.com/2.3.0/events/upcoming/?limit=10";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(
                `The Space Devs API returned ${response.status}`
            );
        }

        const data = await response.json();

        const events = data.results.map((event) => {
            return {
                id: event.id,
                name: event.name,
                description: event.description,
                date: event.date,
                type: event.type?.name || "Unknown",
                image: event.feature_image,
                newsUrl: event.news_url
            };
        });

        res.json(events);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to retrieve upcoming events."
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});