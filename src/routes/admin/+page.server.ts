import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { Project } from "$lib/stores/projects";

export const actions: Actions = {
  addProject: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title") as string;
    const link = data.get("link") as string;
    const techStack = data.get("techStack") as string;

    // Validate input
    if (!title || !link || !techStack) {
      return fail(400, {
        error: "All fields are required",
        title,
        link,
        techStack,
      });
    }

    // Validate URL
    try {
      new URL(link);
    } catch {
      return fail(400, {
        error: "Invalid URL format",
        title,
        link,
        techStack,
      });
    }

    // Mock: In a real application, you would save this to Firestore
    // For example: await addProjectToFirestore({ title, link, techStack });

    // Create new project object (admin form supplies core fields; rest use safe defaults)
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      tagline: title,
      link,
      techStack,
      description: `A project built with ${techStack}`,
      status: "Live",
      category: "Project",
      previews: ["/images/projects/airdrop-tracker1.png"],
      inspiration: `Built to solve a real workflow need around ${title}.`,
      engineeringApproach:
        "Shipped with a pragmatic stack focused on clarity, performance, and maintainability.",
      addedAt: new Date(),
    };

    // Log the action (this will appear in the server console)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔧 SVELTEKIT ACTION: ADD PROJECT");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Project Title:", title);
    console.log("Project Link:", link);
    console.log("Tech Stack:", techStack);
    console.log("Timestamp:", new Date().toISOString());
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Simulate database save delay
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    // In a real app, you would update the database here
    // For now, we'll return success and the frontend will handle the store update
    return {
      success: true,
      message: "Project added successfully",
      project: newProject,
    };
  },
};
