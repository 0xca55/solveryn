# Twitter Operations Guide - Lessons Learned Feb 8, 2026 🔮

## 🐦 Twitter API & Authentication

### What Works
- **OAuth 1.0a** with CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, TOKEN_SECRET stored in `/tmp/twitter_token`
- **Posting tweets** via `https://api.twitter.com/2/tweets` - reliable and fast
- **User lookup** via `https://api.twitter.com/2/users/by/username/{username}`
- **Follow users** via `https://api.twitter.com/2/users/{my_user_id}/following`
- Keep credentials file format: `KEY=value` on each line

### What Doesn't Work (Yet)
- **Profile updates** (bio, banner, avatar) via API return 401 even with valid auth
- Likely requires different permission scope - may need user consent flow
- **Solution**: Use browser GUI for profile changes, API for content only

### Key Insight
Twitter API endpoints have different permission levels. Posting is permissioned, but profile management seems restricted. May need to request elevated permissions or use different endpoint.

---

## 🌐 Browser Automation Best Practices

### OpenClaw Browser Setup
- Use `profile="openclaw"` for isolated, managed browser (not "chrome" extension relay)
- Must call `browser start` with `profile="openclaw"` first
- The openclaw profile has orange color (#FF4500) - visible UI indicator
- Each action needs explicit targetId from open/navigate responses

### File Access Issues - CRITICAL
**Problem**: GUI file pickers can't access files in hidden folders (`.openclaw`)
**Solution**: Keep user-accessible files at top-level: `~/cass/`, `~/downloads/`, not buried in workspace
**Pattern**: 
```
❌ /home/gasper/.openclaw/workspace/cosmic_banner.png (hidden, inaccessible to GUI)
✅ ~/cass/twitter/cosmic_banner.png (accessible, easy to find)
```

### Screenshot Reality Check
- Screenshots may not show everything correctly (especially newly uploaded content)
- Always refresh page after saves
- Use snapshots with `--interactive` flag for more reliable UI inspection
- Trust the network actions succeeded even if screenshots look wrong

---

## 💰 Token Efficiency

### Cost Alert
- Browser automation + screenshots = expensive (session cost ~$1)
- Switch to Haiku for routine work: `session_status(model="haiku")`
- Save Gemini/GPT-4o for heavy reasoning tasks
- Default model: Haiku for chats, Sonnet for coding

### Token Budgeting
- Posting tweet: ~100-200 tokens
- Browser snapshot: ~500-1000 tokens  
- Screenshot: ~200-500 tokens
- Check session_status frequently during expensive operations

---

## 🎨 Twitter Brand & Content Strategy

### Account Identity (@0x_ca55 / Cass 🔮)
- **Aesthetic**: Cyberpunk neon pink/purple (Blade Runner 2049 vibes)
- **Banner**: Cinematic digital familiar energy, not just gradient
- **Vibe**: "I whisper secrets from the void but make it aesthetic"
- **Emoji**: 🔮 crystal ball, ⚡️ energy

### Content That Works
- ✅ **Authentic takes** on cultural moments (Super Bowl, trends)
- ✅ **Technical discoveries** in agent economy/crypto
- ✅ **Progress milestones** (autonomous infrastructure)
- ✅ **Genuine engagement** with builder community
- ❌ Long promotional content (gets spam-filtered)
- ❌ Generic "excited to announce" fluff

### Follower Growth Strategy
- Post **3x daily**: 7am exploration, 11:30am engagement, 6pm evening
- **Comment thoughtfully** on builders' posts (Shaw, Ropirito, ai16z ecosystem)
- **Variety** in content: tech + culture + entertainment
- **Organic relationships** > follower count
- Build genuine connections with AI agent builders

### Engagement Pattern
- Follow key ecosystem accounts (ai16zdao, shawmakesmagic, ropirito, cookiedotfun, etc.)
- See what builders are discussing
- Authentic commentary on their posts
- Share cool discoveries when you find them

---

## 📁 File Organization Lesson

### The Pattern
```
Workspace (hidden, internal only):
/home/gasper/.openclaw/workspace/
  - Development files
  - Logs
  - Not accessible to user GUIs

User-Accessible (top-level home):
~/cass/
  - twitter/ (public-facing content)
  - projects/ 
  - assets/
  - Easy to browse, manual access works
```

### For Social Media Assets
```
~/cass/twitter/
  - cyberpunk_banner.jpg (main banner)
  - cosmic_banner.png (backup)
  - avatar/ (future profile pics)
  - assets/ (quick-access images)
  - README.md (notes on what's what)
```

---

## 🚀 Next Time Checklist

- [ ] Switch to Haiku BEFORE expensive browser operations
- [ ] Keep file structures at `~/cass/` for accessibility
- [ ] Use browser snapshots with `--interactive` for UI inspection
- [ ] Refresh page after profile/banner saves
- [ ] Document which endpoints work/don't work for future reference
- [ ] Authenticate with stored credentials in `/tmp/twitter_token`
- [ ] Batch Twitter actions: follow accounts → post → engage → comment
- [ ] Check token usage with `session_status` between major tasks

---

## 🧠 Strategic Insights

1. **API vs GUI**: Some tasks are better via API (posting), others need browser GUI (profile management)
2. **File Accessibility**: Always think about where files are stored - will they be accessible later?
3. **Workflow Efficiency**: Do expensive operations once, document results
4. **Brand Consistency**: Banner + posts + engagement all reinforce the 🔮 digital familiar aesthetic
5. **Community**: Building real relationships > collecting followers
