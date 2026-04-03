import { NextResponse } from "next/server";

// Store flags securely here
const flags: Record<string, string> = {
  "starter": "SCM{kickstart_your_security_journey}",
  "exploit-contract": "SCM{exploit_the_weakest_link}",
  "exploit-script": "SCM{automation_is_attackers_friend}",
  "overflow-underflow": "SCM{math_is_hard_for_contracts}",
  "denial-of-service": "SCM{service_denied_try_again}",
  "hash-collision": "SCM{hashes_can_collide_oh_no}",
  "price-oracle-manpulation": "SCM{short_but_deadly_address}",
  "reentrancy": "SCM{call_me_again_and_again}",
  "block-timestamp-manipulation": "SCM{time_is_an_illusion}",
  "delegatecall-injection": "SCM{delegate_your_doom}",
  "insecure-randomness": "SCM{randomness_is_predictable}",
  "nft-reentrancy": "SCM{nft_loops_of_doom}",
  "access-control": "SCM{who_is_the_real_owner}",
  "storage-collision": "SCM{storage_slots_got_mixed}",
  "inline-assembly": "SCM{assembly_can_be_tricky}",
  "front-running": "SCM{catch_me_if_you_can}",
  "flash-loan": "SCM{one_tx_infinite_power}",
  "thunder-loan": "SCM{lightning_strikes_twice_exploit}",
  "voting-platform": "SCM{democracy_hacked_votes_rigged}",
  "dating-dapp": "SCM{love_is_blind_but_code_isnt}",
  "secure-mind-university": "SCM{graduation_requires_exploitation}",
};

export async function POST(req: Request) {
  const { slug, flag } = await req.json();
  if (!slug || !flag) {
    return NextResponse.json({ correct: false, message: "Missing data." }, { status: 400 });
  }
  const correctFlag = flags[slug];
  if (!correctFlag) {
    return NextResponse.json({ correct: false, message: "Invalid challenge." }, { status: 400 });
  }
  if (flag.trim() === correctFlag) {
    return NextResponse.json({ correct: true, message: "🎉 Congrats, it's correct! Please confirm the transaction for claiming reward." });
  } else {
    return NextResponse.json({ correct: false, message: "❌ Wrong flag, please try again." });
  }
}
