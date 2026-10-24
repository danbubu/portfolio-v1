<script lang="ts">
	import { z } from 'zod';

	const contactSchema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.string().email('Invalid email address'),
		message: z.string().min(10, 'Message must be at least 10 characters'),
		honeypot: z.string().max(0, 'Bot detected')
	});

	let form = { name: '', email: '', message: '', honeypot: '' };
	let status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let feedback = '';
	let errors: string[] = [];
	let emailCopied = false;
	let lastSubmissionTime = 0;

	// TODO(Daniel): confirm what the Firestore write is for. Email is what the visitor sees.
	// TODO(Daniel): a reply-time promise stays off this page until you confirm one.

	const socials = [
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/daniel-mawuena-833b3331b/'
		},
		{ name: 'GitHub', href: 'https://github.com/danbubu' },
		{ name: 'Substack', href: 'https://thatbubuguy.substack.com/' },
		{ name: 'X', href: 'https://x.com/thatbubuguy' },
		{ name: 'Instagram', href: 'https://www.instagram.com/thatbubuguy/' }
	];

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText('danielmawuena75@gmail.com');
			emailCopied = true;
			setTimeout(() => {
				emailCopied = false;
			}, 2000);
		} catch {
			emailCopied = false;
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		errors = [];
		feedback = '';

		if (form.honeypot !== '') return;

		const parsed = contactSchema.safeParse(form);
		if (!parsed.success) {
			status = 'error';
			errors = parsed.error.issues.map((issue) => issue.message);
			feedback = errors[0] ?? 'Check the form and try again.';
			return;
		}

		const now = Date.now();
		if (now - lastSubmissionTime < 60000) {
			status = 'error';
			feedback = 'Please wait a moment before sending another message.';
			return;
		}

		const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
		const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
		const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
		if (!serviceId || !templateId || !publicKey) {
			status = 'error';
			feedback = "That didn't send. Please try again, or email danielmawuena75@gmail.com.";
			return;
		}

		status = 'submitting';
		lastSubmissionTime = now;

		try {
			const emailjs = (await import('@emailjs/browser')).default;
			await emailjs.send(
				serviceId,
				templateId,
				{
					name: form.name.trim(),
					email: form.email.trim(),
					message: form.message.trim()
				},
				publicKey
			);

			const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
			const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
			if (apiKey && projectId) {
				try {
					const { addDoc, collection } = await import('firebase/firestore');
					const { db } = await import('$lib/firebase');
					await addDoc(collection(db, 'messages'), {
						name: form.name.trim().replace(/[<>]/g, ''),
						email: form.email.trim().replace(/[<>]/g, ''),
						message: form.message.trim().replace(/[<>]/g, ''),
						timestamp: new Date()
					});
				} catch (error) {
					if (import.meta.env.DEV) console.error('Firestore backup failed', error);
				}
			}

			status = 'success';
			feedback = "Thanks, your message is on its way. I'll reply by email.";
			form = { name: '', email: '', message: '', honeypot: '' };
		} catch (error) {
			if (import.meta.env.DEV) console.error(error);
			status = 'error';
			feedback = "That didn't send. Please try again, or email danielmawuena75@gmail.com.";
		}
	}
</script>

<section id="contact" class="relative overflow-hidden py-20">
	<div class="container relative z-10 mx-auto max-w-7xl px-6 md:px-8">
		<div class="grid items-start gap-12 lg:grid-cols-2">
			<div>
				<h2 class="mb-4 text-5xl font-bold text-text-heading md:text-6xl">Let's talk</h2>
				<p class="mb-8 text-lg leading-relaxed text-text-body">
					I'm open to remote part-time roles in React, Next.js, product engineering and QA (about
					21 hours a week while I finish national service, until around November 2027), and to
					small freelance builds. Email is the quickest way to reach me.
				</p>
				<div class="mb-8">
					<p class="mb-2 font-mono text-xs uppercase tracking-wider text-text-muted">Email</p>
					<button
						type="button"
						on:click={copyEmail}
						class="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-left font-mono text-text-heading hover:border-azure/50"
					>
						danielmawuena75@gmail.com
						<span class="text-xs text-text-muted">{emailCopied ? 'Copied' : 'Copy'}</span>
					</button>
				</div>
				<ul class="space-y-3">
					{#each socials as social}
						<li>
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-3 font-semibold text-text-heading hover:border-azure/40"
							>
								{social.name}
								<span aria-hidden="true">↗</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<form
				class="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8"
				on:submit={handleSubmit}
				novalidate
			>
				<input
					type="text"
					name="company_role"
					class="absolute -z-50 h-0 w-0 opacity-0"
					bind:value={form.honeypot}
					tabindex="-1"
					autocomplete="off"
					aria-hidden="true"
				/>
				<div>
					<label for="name" class="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted"
						>Name</label
					>
					<input
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						bind:value={form.name}
						disabled={status === 'submitting'}
						class="terminal-input h-12 w-full border-b border-white/20 bg-black/40 px-4 text-text-heading focus:border-blue-400 focus:outline-none"
					/>
				</div>
				<div>
					<label
						for="email"
						class="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">Email</label
					>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={form.email}
						disabled={status === 'submitting'}
						class="terminal-input h-12 w-full border-b border-white/20 bg-black/40 px-4 text-text-heading focus:border-blue-400 focus:outline-none"
					/>
				</div>
				<div>
					<label
						for="message"
						class="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted"
						>Message</label
					>
					<textarea
						id="message"
						name="message"
						rows="6"
						bind:value={form.message}
						disabled={status === 'submitting'}
						class="terminal-input min-h-[140px] w-full border-b border-white/20 bg-black/40 px-4 py-3 text-text-heading focus:border-blue-400 focus:outline-none"
					></textarea>
				</div>
				<div role="status" aria-live="polite" class="min-h-[1.5rem] text-sm">
					{#if status === 'success'}
						<p class="text-green-300">{feedback}</p>
					{:else if errors.length}
						<ul class="space-y-1 text-red-300">
							{#each errors as error}
								<li>{error}</li>
							{/each}
						</ul>
					{:else if feedback}
						<p class="text-red-300">{feedback}</p>
					{/if}
				</div>
				<button
					type="submit"
					disabled={status === 'submitting'}
					class="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white disabled:opacity-60"
				>
					{status === 'submitting' ? 'Sending...' : 'Send message'}
				</button>
			</form>
		</div>
	</div>
</section>
