<script>
  import { onMount } from "svelte";

  export let color = "transparent";

  let _triggerRef;
  let _contentRef;
  let _alignment;
  let _open = true;

  onMount(() => {
    const triggerBounds = _triggerRef.getBoundingClientRect();
    const contentBounds = _contentRef.getBoundingClientRect();

    _alignment =
      triggerBounds.left + contentBounds.width > window.innerWidth ? -1 : 0;

    _contentRef.style.bottom = triggerBounds.height + "px";

    // Start with content box hidden
    hide();
  });

  /**
   * Show content box
   */
  const show = () => {
    _open = true;
  };

  /**
   * Hide content box
   */
  const hide = () => {
    _open = false;
  };
</script>

<style>
  .popover {
    position: relative;
  }

  .popover-content {
    display: inline-block;
    position: absolute;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -10px);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    transition: all 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
  }

  .popover-content.hidden {
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 0px);
  }

  .arrow {
    position: absolute;
    z-index: -1;
    content: "";
    bottom: -9px;
    border-style: solid;
    border-width: 10px 10px 0px 10px;
  }

  .left-align,
  .left-align .arrow {
    left: 0;
    right: unset;
  }

  .right-align,
  .right-align .arrow {
    right: 0;
    left: unset;
  }
</style>

<div
  class="popover"
  on:mousedown
  on:mouseover={show}
  on:mouseout={hide}
  on:mouseup
  on:mousewheel>
  <div bind:this={_triggerRef}>
    <slot name="target" />
  </div>
  <div
    class="popover-content"
    bind:this={_contentRef}
    class:hidden={!_open}
    class:left-align={_alignment !== -1}
    class:right-align={_alignment === -1}>
    <slot name="content" />
    <div
      class="arrow"
      style="border-color: {color} transparent transparent transparent;" />
  </div>
</div>
