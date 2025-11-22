<script lang="ts">
	import { enhance } from '$app/forms';
	import { projects } from '$lib/stores/projects';
	import type { Project } from '$lib/stores/projects';
	import { onMount } from 'svelte';

	// GSAP will be imported client-side only
	let gsap: any;

	let form: HTMLFormElement;
	let title = '';
	let link = '';
	let techStack = '';
	let message: string | null = null;
	let messageType: 'success' | 'error' | null = null;

	// Ensure proper typing for projects
	$: typedProjects = $projects as Project[];

	onMount(async () => {
		// Animate page entrance (client-side only)
		if (typeof window !== 'undefined') {
			const gsapModule = await import('gsap');
			gsap = gsapModule.gsap;
			gsap.from('.admin-content', {
				opacity: 0,
				y: 30,
				duration: 0.6,
				ease: 'power2.out'
			});
		}
	});

	async function handleSubmit(event: any) {
		const { result, update } = event;
		await update();

		if (result.type === 'success' && result.data && typeof result.data === 'object' && 'project' in result.data) {
			// Add project to store
			const newProject = result.data.project as Project;
			projects.update((p) => [...p, newProject]);

			// Show success message
			message = 'Project added successfully! Check the server console for action logs.';
			messageType = 'success';

			// Reset form
			title = '';
			link = '';
			techStack = '';

			// Clear message after 5 seconds
			setTimeout(() => {
				message = null;
				messageType = null;
			}, 5000);
		} else if (result.type === 'failure') {
			const errorMessage = result.data && typeof result.data === 'object' && 'error' in result.data
				? (result.data.error as string)
				: 'Error adding project. Please check all fields are valid.';
			message = errorMessage;
			messageType = 'error';

			setTimeout(() => {
				message = null;
				messageType = null;
			}, 5000);
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Project Management</title>
	<meta name="description" content="Admin Dashboard for managing projects" />
</svelte:head>

<div class="min-h-screen bg-dark-950 py-12">
	<div class="container mx-auto px-4 max-w-4xl">
		<div class="admin-content">
			<!-- Header -->
			<div class="mb-8">
				<h1
					class="text-5xl font-bold mb-4 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
				>
					Admin Dashboard
				</h1>
				<p class="text-dark-400 text-lg">
					Manage your projects using SvelteKit Actions. This demonstrates full-stack form handling
					and server-side data processing.
				</p>
				<a
					href="/"
					class="inline-block mt-4 text-accent-blue hover:underline"
				>
					← Back to Portfolio
				</a>
			</div>

			<!-- Success/Error Messages -->
			{#if message}
				<div
					class="p-4 rounded-lg mb-6 border {messageType === 'success'
						? 'bg-green-900/30 border-green-500 text-green-400'
						: 'bg-red-900/30 border-red-500 text-red-400'}"
				>
					{message}
				</div>
			{/if}

			<!-- Add Project Form -->
			<div class="bg-dark-800 rounded-lg border border-dark-700 p-8 mb-8">
				<h2 class="text-2xl font-bold mb-6 text-accent-blue">Add New Project</h2>

				<form
					method="POST"
					action="?/addProject"
					use:enhance={handleSubmit}
					bind:this={form}
					class="space-y-6"
				>
					<div>
						<label for="title" class="block text-sm font-semibold mb-2 text-dark-300">
							Project Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							bind:value={title}
							required
							class="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue text-white"
							placeholder="e.g., E-Commerce Platform"
						/>
					</div>

					<div>
						<label for="link" class="block text-sm font-semibold mb-2 text-dark-300">
							Project Link
						</label>
						<input
							type="url"
							id="link"
							name="link"
							bind:value={link}
							required
							class="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue text-white"
							placeholder="https://example.com"
						/>
					</div>

					<div>
						<label for="techStack" class="block text-sm font-semibold mb-2 text-dark-300">
							Tech Stack
						</label>
						<input
							type="text"
							id="techStack"
							name="techStack"
							bind:value={techStack}
							required
							class="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue text-white"
							placeholder="e.g., React, TypeScript, Firebase, Tailwind CSS"
						/>
						<p class="text-dark-400 text-sm mt-2">
							Separate technologies with commas
						</p>
					</div>

					<button
						type="submit"
						class="w-full px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg font-semibold hover:glow-effect transition-all"
					>
						Add Project
					</button>
				</form>
			</div>

			<!-- Current Projects List -->
			<div class="bg-dark-800 rounded-lg border border-dark-700 p-8">
				<h2 class="text-2xl font-bold mb-6 text-accent-purple">Current Projects</h2>

				<div class="space-y-4">
					{#each typedProjects as project (project.id)}
						<div class="bg-dark-700 rounded-lg p-4 border border-dark-600">
							<div class="flex justify-between items-start">
								<div>
									<h3 class="text-xl font-bold text-white mb-2">{project.title}</h3>
									<p class="text-dark-400 text-sm mb-2">{project.techStack}</p>
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										class="text-accent-blue hover:underline text-sm"
									>
										{project.link}
									</a>
								</div>
								{#if project.addedAt}
									<span class="text-dark-500 text-xs">
										{new Date(project.addedAt).toLocaleDateString()}
									</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Technical Note -->
			<div class="mt-8 p-6 bg-dark-800/50 rounded-lg border border-dark-700">
				<h3 class="text-lg font-bold mb-3 text-accent-cyan">💡 Technical Implementation</h3>
				<ul class="space-y-2 text-dark-400 text-sm">
					<li>• This form uses <strong>SvelteKit Actions</strong> for server-side processing</li>
					<li>• Form data is validated on the server before processing</li>
					<li>• Check the server console to see the action logs</li>
					<li>• In a production app, this would integrate with Firestore/Firebase</li>
					<li>• Projects are stored in a Svelte store for client-side state management</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style>

