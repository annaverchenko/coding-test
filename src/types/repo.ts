type OwnerType = {
	login: string
	id: number
	node_id: string
	avatar_url: string
	gravatar_id: string
	url: string
	html_url: string
	followers_url: string
	following_url: string
	gists_url: string
	starred_url: string
	subscriptions_url: string
	organizations_url: string
	repos_url: string
	events_url: string
	received_events_url: string
	type: string
	site_admin: boolean
}

type LicenseType = {
	key: string
	name: string
	spdx_id: string
	url: string
	node_id: string
}

// This is what comes in as a single repo when calling for all user's repositories
export type RepoType = {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: OwnerType
	html_url: string
	description: string
	fork: boolean
	url: string
	forks_url: string
	keys_url: string
	collaborators_url: string
	teams_url: string
	hooks_url: string
	issue_events_url: string
	events_url: string
	assignees_url: string
	branches_url: string
	tags_url: string
	blobs_url: string
	git_tags_url: string
	git_refs_url: string
	trees_url: string
	statuses_url: string
	languages_url: string
	stargazers_url: string
	contributors_url: string
	subscribers_url: string
	subscription_url: string
	commits_url: string
	git_commits_url: string
	comments_url: string
	issue_comment_url: string
	contents_url: string
	compare_url: string
	merges_url: string
	archive_url: string
	downloads_url: string
	issues_url: string
	pulls_url: string
	milestones_url: string
	notifications_url: string
	labels_url: string
	releases_url: string
	deployments_url: string
	created_at: string
	updated_at: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: string | null
	size: number
	stargazers_count: number
	watchers_count: number
	language: string | null
	has_issues: boolean
	has_projects: boolean
	has_downloads: boolean
	has_wiki: boolean
	has_pages: boolean
	forks_count: number
	mirror_url: unknown
	archived: boolean
	disabled: boolean
	open_issues_count: number
	license: LicenseType | null
	allow_forking: boolean
	is_template: boolean
	topics: Array<unknown>
	visibility: string
	forks: number
	open_issues: number
	watchers: number
	default_branch: string
	status?: RepoFetchStatus
}

export type RepoFetchStatus = {
	success: boolean
}

export type ReposFetchErrorType = {
	isActive: boolean
	message: string
}

// This is what comes in as data when calling for a user's single repository
export type UserSingleRepoType = {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: OwnerType
	html_url: string
	description: string
	fork: boolean
	url: string
	forks_url: string
	keys_url: string
	collaborators_url: string
	teams_url: string
	hooks_url: string
	issue_events_url: string
	events_url: string
	assignees_url: string
	branches_url: string
	tags_url: string
	blobs_url: string
	git_tags_url: string
	git_refs_url: string
	trees_url: string
	statuses_url: string
	languages_url: string
	stargazers_url: string
	contributors_url: string
	subscribers_url: string
	subscription_url: string
	commits_url: string
	git_commits_url: string
	comments_url: string
	issue_comment_url: string
	contents_url: string
	compare_url: string
	merges_url: string
	archive_url: string
	downloads_url: string
	issues_url: string
	pulls_url: string
	milestones_url: string
	notifications_url: string
	labels_url: string
	releases_url: string
	deployments_url: string
	created_at: string
	updated_at: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: string
	size: number
	stargazers_count: number
	watchers_count: number
	language: string | null
	has_issues: boolean
	has_projects: boolean
	has_downloads: boolean
	has_wiki: boolean
	has_pages: boolean
	forks_count: number
	mirror_url: null | string
	archived: boolean
	disabled: boolean
	open_issues_count: number
	license: LicenseType
	allow_forking: boolean
	is_template: boolean
	topics: Array<string>
	visibility: string
	forks: number
	open_issues: number
	watchers: number
	default_branch: string
	temp_clone_token: any
	parent: {
		id: number
		node_id: string
		name: string
		full_name: string
		private: boolean
		owner: OwnerType
		html_url: string
		description: string
		fork: boolean
		url: string
		forks_url: string
		keys_url: string
		collaborators_url: string
		teams_url: string
		hooks_url: string
		issue_events_url: string
		events_url: string
		assignees_url: string
		branches_url: string
		tags_url: string
		blobs_url: string
		git_tags_url: string
		git_refs_url: string
		trees_url: string
		statuses_url: string
		languages_url: string
		stargazers_url: string
		contributors_url: string
		subscribers_url: string
		subscription_url: string
		commits_url: string
		git_commits_url: string
		comments_url: string
		issue_comment_url: string
		contents_url: string
		compare_url: string
		merges_url: string
		archive_url: string
		downloads_url: string
		issues_url: string
		pulls_url: string
		milestones_url: string
		notifications_url: string
		labels_url: string
		releases_url: string
		deployments_url: string
		created_at: string
		updated_at: string
		pushed_at: string
		git_url: string
		ssh_url: string
		clone_url: string
		svn_url: string
		homepage: string
		size: number
		stargazers_count: number
		watchers_count: number
		language: string | null
		has_issues: boolean
		has_projects: boolean
		has_downloads: boolean
		has_wiki: boolean
		has_pages: boolean
		forks_count: number
		mirror_url: null | string
		archived: boolean
		disabled: boolean
		open_issues_count: number
		license: LicenseType
		allow_forking: boolean
		is_template: boolean
		topics: Array<string>
		visibility: string
		forks: number
		open_issues: number
		watchers: number
		default_branch: string
	}
	source: {
		id: number
		node_id: string
		name: string
		full_name: string
		private: boolean
		owner: OwnerType
		html_url: string
		description: string
		fork: boolean
		url: string
		forks_url: string
		keys_url: string
		collaborators_url: string
		teams_url: string
		hooks_url: string
		issue_events_url: string
		events_url: string
		assignees_url: string
		branches_url: string
		tags_url: string
		blobs_url: string
		git_tags_url: string
		git_refs_url: string
		trees_url: string
		statuses_url: string
		languages_url: string
		stargazers_url: string
		contributors_url: string
		subscribers_url: string
		subscription_url: string
		commits_url: string
		git_commits_url: string
		comments_url: string
		issue_comment_url: string
		contents_url: string
		compare_url: string
		merges_url: string
		archive_url: string
		downloads_url: string
		issues_url: string
		pulls_url: string
		milestones_url: string
		notifications_url: string
		labels_url: string
		releases_url: string
		deployments_url: string
		created_at: string
		updated_at: string
		pushed_at: string
		git_url: string
		ssh_url: string
		clone_url: string
		svn_url: string
		homepage: string
		size: number
		stargazers_count: number
		watchers_count: number
		language: string | null
		has_issues: boolean
		has_projects: boolean
		has_downloads: boolean
		has_wiki: boolean
		has_pages: boolean
		forks_count: number
		mirror_url: null | string
		archived: boolean
		disabled: boolean
		open_issues_count: number
		license: LicenseType
		allow_forking: boolean
		is_template: boolean
		topics: Array<string>
		visibility: string
		forks: number
		open_issues: number
		watchers: number
		default_branch: string
	}
	network_count: number
	subscribers_count: number
	success?: boolean
}

export type RepoTypeReduced = {
	id: number
	name: string
	language: string | null
	stargazers_count: number
	forks: number
	updated_at: string
	owner: OwnerType
}

export type PullRequestType = {
	id: number
	state: string
	title: string
	user: OwnerType
	body: string | null
	created_at: string
	updated_at: string
	closed_at: string | null
}

export type IssueType = {
	id: number
	title: string
	body: string | null
	state: string
	user: OwnerType
	created_at: string
	updated_at: string
	closed_at: string | null
}

export type ContributorType = {
	login: string
	id: number
	avatar_url: string | null
	contributions: number
	type: string
}
