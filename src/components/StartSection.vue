<template>
    <section class="startnow-section" id="startnow">
        <div class="bg-glow"></div>
        <div class="content-wrapper">
            <div class="header-text">
                <h2>Ready to Node?</h2>
                <p>Join the future of decentralized networks in seconds.</p>
            </div>

            <video class="start-video" autoplay loop muted playsinline>
                <source src="../assets/startvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            <div class="action-container">
                <span class="small-info">Fast Setup</span>
                <a href="https://dashboard.axonode.org" class="start-btn">Start</a>
                <span class="small-info">Secure Network</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .startnow-section {
        position: relative;
        width: 100%;
        background-color: var(--bg-color);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4rem 2rem;
        box-sizing: border-box;
        overflow: hidden;
    }

    .bg-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50vw;
        height: 50vw;
        background: radial-gradient(circle, rgba(254, 120, 178, 0.08) 0%, rgba(0,0,0,0) 70%);
        z-index: 0;
        pointer-events: none;
    }

    .content-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        width: 100%;
    }

    .header-text {
        text-align: center;
        color: var(--text-color);
    }

    .header-text h2 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        background: linear-gradient(90deg, var(--text-color), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .header-text p {
        font-size: 1.1rem;
        opacity: 0.8;
    }

    .start-video {
        width: 100%;
        max-width: 900px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(254, 120, 178, 0.15);
        border: 1px solid rgba(254, 120, 178, 0.1);
    }

    .action-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-top: 0.5rem;
    }

    .small-info {
        font-size: 0.95rem;
        color: var(--text-color);
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
    }

    .start-btn {
        background-color: var(--accent-secondary);
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 1rem 4rem;
        border-radius: 50px;
        text-decoration: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .start-btn:hover {
        background-color: var(--accent-secondary);
        transform: translateY(-3px);
    }

    .start-btn:active {
        transform: translateY(1px);
    }

    @media (max-width: 768px) {
        .action-container {
            flex-direction: column;
            gap: 1.5rem;
        }
        .header-text h2 {
            font-size: 2rem;
        }
    }
</style>