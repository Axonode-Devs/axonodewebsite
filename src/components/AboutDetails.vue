<template>
    <section class="details-section" id="about-details">
        <div class="container">
            <h1 class="section-title">{{ $t("about_us.header.title") }}</h1>
            <div class="top-container">
                <div class="video-section">
                    <video
                        src="/src/assets/video.mp4"
                        autoplay
                        loop
                        muted
                        playsinline
                    ></video>
                </div>
                <div class="text-section">
                    <p class="text-header">{{ $t("about_section.title") }}</p>
                    <i18n-t
                        keypath="about_section.sub-text"
                        tag="p"
                        class="text"
                        scope="global"
                    >
                        <template #i1
                            ><span class="italic-hg">{{
                                $t("about_section.sub.i1")
                            }}</span></template
                        >
                        <template #b1
                            ><span class="bold-hg">{{
                                $t("about_section.sub.b1")
                            }}</span></template
                        >
                        <template #b2
                            ><span class="bold-hg">{{
                                $t("about_section.sub.b2")
                            }}</span></template
                        >
                        <template #i2
                            ><span class="italic-hg">{{
                                $t("about_section.sub.i2")
                            }}</span></template
                        >
                        <template #b3
                            ><span class="bold-hg">{{
                                $t("about_section.sub.b3")
                            }}</span></template
                        >
                        <template #i3
                            ><span class="italic-hg">{{
                                $t("about_section.sub.i3")
                            }}</span></template
                        >
                        <template #b4
                            ><span class="bold-hg">{{
                                $t("about_section.sub.b4")
                            }}</span></template
                        >
                        <template #b5
                            ><span class="bold-hg">{{
                                $t("about_section.sub.b5")
                            }}</span></template
                        >
                    </i18n-t>
                </div>
            </div>
            <div class="mini-divider"></div>
            <div class="founders-section">
                <div
                    v-for="(member, index) in teamMembers"
                    :key="index"
                    class="card"
                    @click="openModal(member)"
                >
                    <div class="card-top">
                        <img
                            :src="
                                member.avatarUrl ||
                                `https://github.com/${member.username}.png`
                            "
                            :alt="member.name"
                            class="profile-picture"
                            :style="{ borderColor: member.color }"
                        />
                        <div class="card-info">
                            <div class="name">{{ member.name }}</div>
                            <div class="role" :style="{ color: member.color }">
                                {{ $t(member.role) }}
                            </div>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <p class="description">{{ $t(member.bio_key) }}</p>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="modal">
            <div
                v-if="selectedMember"
                class="modal-overlay"
                @click.self="closeModal"
            >
                <div class="modal-card">
                    <button class="modal-close" @click="closeModal">✕</button>

                    <div class="modal-id-header">
                        <img
                            :src="
                                selectedMember.avatarUrl ||
                                `https://github.com/${selectedMember.username}.png`
                            "
                            :alt="selectedMember.name"
                            class="modal-avatar"
                            :style="{
                                border: `2px solid ${selectedMember.color}`,
                            }"
                        />
                        <div class="modal-id-text">
                            <h3 class="modal-name">
                                {{ selectedMember.name }}
                            </h3>
                            <span
                                class="modal-role"
                                :style="{ color: selectedMember.color }"
                                >{{ $t(selectedMember.role) }}</span
                            >
                        </div>
                    </div>

                    <div class="modal-divider"></div>

                    <div class="modal-body">
                        <p class="modal-bio">
                            {{ $t(selectedMember.bio_key) }}
                        </p>

                        <div
                            class="links-list"
                            v-if="
                                selectedMember.links &&
                                selectedMember.links.length
                            "
                        >
                            <a
                                v-for="(link, idx) in selectedMember.links"
                                :key="idx"
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="link-item"
                                :style="{
                                    '--member-color': selectedMember.color,
                                }"
                            >
                                <span class="link-label">{{ link.label }}</span>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M7 7h10v10M7 17L17 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface TeamMember {
    name: string;
    role: string;
    username: string;
    color: string;
    bio_key: string;
    links: { label: string; url: string }[];
    avatarUrl?: string;
}

const baseTeam: TeamMember[] = [
    {
        name: "Yaser Durubi",
        role: "team.roles.head_productions",
        username: "kaiross12",
        color: "#a59ce6",
        bio_key: "team.bios.yaser_durubi",
        links: [
            { label: "GitHub", url: "https://github.com/kaiross12" },
            {
                label: "Discord",
                url: "https://discord.com/users/832944025216352287",
            },
            { label: "Instagram", url: "https://www.instagram.com/yaserr_d/" },
        ],
    },
    {
        name: "Bersis Sevimli",
        role: "team.roles.head_executive",
        username: "bersisse",
        color: "#78dee7",
        bio_key: "team.bios.bersis_sevimli",
        links: [
            { label: "GitHub", url: "https://github.com/bersisse" },
            { label: "LinkedIn", url: "#" },
        ],
    },
    {
        name: "Kaan Uygun",
        role: "team.roles.head_pr",
        username: "Kaan610",
        color: "#fe78b0",
        bio_key: "team.bios.kaan_uygun",
        links: [],
    },
];

// teamMembers holds the actual reactive objects the template renders.
// We mutate these in place once avatars are fetched, instead of swapping
// in a brand-new array/objects — that's what was breaking avatarUrl:
// the modal held a reference to the OLD object from baseTeam, so if you
// opened it before the fetch resolved, selectedMember never picked up
// the fetched avatarUrl even after teamMembers.value was replaced.
const teamMembers = ref<TeamMember[]>(baseTeam.map((m) => ({ ...m })));
const selectedMember = ref<TeamMember | null>(null);

const openModal = (member: TeamMember) => {
    selectedMember.value = member;
    document.body.style.overflow = "hidden";
};

const closeModal = () => {
    selectedMember.value = null;
    document.body.style.overflow = "";
};

const fetchTeam = async () => {
    await Promise.all(
        teamMembers.value.map(async (member) => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${member.username}`,
                );
                if (!res.ok) return;
                const data = await res.json();
                // Mutate the existing object in place so any reference
                // held elsewhere (like selectedMember) updates too.
                member.avatarUrl =
                    data.avatar_url ||
                    `https://github.com/${member.username}.png`;
            } catch {
                // keep fallback (github.com/<user>.png) already used in template
            }
        }),
    );
};

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && selectedMember.value) {
        closeModal();
    }
};

onMounted(() => {
    fetchTeam();
    window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKeydown);
});
</script>
<style scoped>
.section-title {
    font-family: var(--font-family);
    font-size: 3rem;
    font-weight: 500;
    color: var(--main3-color);
}
.container {
    max-width: 1590px;
    margin: 0 auto;
    padding: 0 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
}

.top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 40px;
}

.video-section {
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    overflow: hidden;
}

.video-section video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
}

.text-header {
    font-size: 1.2rem;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    margin: 0;
    color: var(--main2-color);
}

.text-section {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: left;
}

.main-header {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--main3-color);
    font-family: "Poppins", sans-serif;
}

.text-section .text {
    font-size: 1rem;
    font-weight: 300;
    color: var(--text-color2);
    font-family: "Poppins", sans-serif;
    margin: 0;
}

.mini-divider {
    display: flex;
    align-items: center;
    width: 50%;
    margin-top: 40px;
    margin-bottom: 40px;
    color: #313131;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

:deep(.bold-hg) {
    font-weight: 400;
    color: var(--text-color);
}

:deep(.italic-hg) {
    font-weight: 400;
    font-style: italic;
    color: var(--main2-color);
}

.mini-divider::before {
    content: "";
    flex: 1;
    height: 2px;
    background: linear-gradient(to right, transparent, #272727);
}

.mini-divider::after {
    content: "";
    flex: 1;
    height: 2px;
    background: linear-gradient(to left, transparent, #272727);
}

.founders-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.card {
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border: 1.5px solid #63636349;
    background-color: #1d1d1d70;
    border-radius: 20px;
    padding: 24px 20px;
    gap: 20px;
    cursor: pointer;
    transition:
        transform 0.3s ease,
        background-color 0.3s ease,
        border-color 0.3s ease;
    box-shadow: 0px 0px 20px #0000003a;
    box-sizing: border-box;
}

.card:hover {
    transform: translateY(-5px);
    background-color: #2222225f;
    border-color: #555;
}

.card-top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
}

.card-top .profile-picture {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #9090903e;
    object-fit: cover;
    flex-shrink: 0;
}

.card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.card-top .name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
}

.card-top .role {
    font-size: 0.8rem;
    font-weight: 500;
}

.card-bottom {
    width: 100%;
    flex: 1;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

.card-bottom .description {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #aaa;
    margin: 0;
    text-align: left;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-card {
    position: relative;
    background: var(--sc-color, #1a1a1a);
    border-radius: 24px;
    padding: 32px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    border: 1px solid var(--border-color, #333);
    max-height: 90vh;
    overflow-y: auto;
    box-sizing: border-box;
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.05);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #aaa;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: transparent;
    color: #fff;
}

.modal-id-header {
    display: flex;
    align-items: center;
    gap: 18px;
    font-family: "Poppins", sans-serif;
}

.modal-avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    flex-shrink: 0;
}

.modal-id-text {
    display: flex;
    flex-direction: column;
}

.modal-name {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0 0 6px 0;
    color: var(--text-color, #fff);
}

.modal-role {
    font-size: 0.7rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 50px;
    align-self: flex-start;
}

.modal-divider {
    height: 1px;
    margin: 24px 0 20px;
    background: repeating-linear-gradient(
        to right,
        var(--border-color, #333) 0,
        var(--border-color, #333) 6px,
        transparent 6px,
        transparent 12px
    );
}

.modal-bio {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-color2, #ccc);
    margin: 0;
}

.links-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 30px;
}

.link-item {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 14px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-color, #333);
    border-radius: 999px;
    color: var(--text-color2, #ccc);
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.link-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--member-color, #fff);
    border-color: var(--member-color, #fff);
}

.link-item svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
}

.modal-enter-active,
.modal-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

/* Large tablets / small desktops */
@media (max-width: 1440px) {
    .container {
        padding: 0 80px;
    }
}

/* Tablets */
@media (max-width: 1024px) {
    .container {
        padding: 0 40px;
    }

    .section-title {
        font-size: 2.4rem;
    }

    .top-container {
        gap: 24px;
    }
}

/* Below this, stack video/text and switch cards to full width */
@media (max-width: 768px) {
    .container {
        padding: 0 20px;
    }

    .section-title {
        font-size: 1.6rem;
    }

    .top-container {
        flex-direction: column;
        gap: 24px;
    }

    .text-section {
        width: 100%;
    }

    /* Video removed on mobile/tablet-down layouts */
    .video-section {
        display: none;
    }

    .text-section {
        text-align: center;
        align-items: center;
    }

    .text-header {
        font-size: 1rem;
    }

    .text-section .text {
        font-size: 0.88rem;
    }

    .mini-divider {
        width: 80%;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .founders-section {
        gap: 12px;
    }

    .card {
        width: 100%;
        max-width: 360px;
        /* fixed height so long bios get truncated with the fade mask
           instead of stretching the card down the page */
        height: 150px;
        padding: 16px 16px;
        gap: 12px;
    }

    .card-top {
        gap: 12px;
    }

    .card-top .profile-picture {
        width: 44px;
        height: 44px;
    }

    .card-top .name {
        font-size: 0.95rem;
    }

    .card-bottom .description {
        font-size: 0.8rem;
    }

    .modal-card {
        padding: 24px;
        border-radius: 18px;
    }

    .modal-avatar {
        width: 64px;
        height: 64px;
    }

    .modal-name {
        font-size: 1.2rem;
    }
}

/* Small mobile */
@media (max-width: 420px) {
    .section-title {
        font-size: 1.5rem;
    }

    .card-top .profile-picture {
        width: 42px;
        height: 42px;
    }

    .card-top .name {
        font-size: 0.9rem;
    }

    .card-bottom .description {
        font-size: 0.78rem;
    }

    .modal-overlay {
        padding: 12px;
    }

    .modal-card {
        padding: 20px;
    }

    .modal-id-header {
        gap: 12px;
    }

    .links-list {
        gap: 8px;
    }

    .link-item {
        padding: 8px 12px;
        font-size: 0.78rem;
    }
}
</style>
