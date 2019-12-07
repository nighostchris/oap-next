import React from 'react';

// type flavorOptions = {
//   [key: string]: string | any
// }

// const flavors: flavorOptions = {
//   color: {
//     primary: '#FFFFFF',
//     secondary: '#FFFFFF',
//   },
//   backgroundColor: {
//     primary: '#2C7BE5',
//   },
//   borderColor: {
//     primay: '#2C7BE5',
//   },
// };

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  flavor: string
  size?: string
}

const Button : React.SFC<ButtonProps> = ({ onClick, flavor, size }) => (
  <>
    <button className={`btn btn-${flavor} ${size ? `btn-${size === 'large' ? 'lg' : 'sm'}` : ''}`} type="button" onClick={onClick}>Testing</button>
    <style jsx>
      {`
      .btn {
        display: inline-block;
        font-weight: 400;
        color: #12263F;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
          -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.5rem 0.75rem;
        font-size: 0.9375rem;
        line-height: 1.5;
        border-radius: 0.375rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .btn {
            transition: none; } }
        .btn:hover {
          color: #12263F;
          text-decoration: none; }
        .btn:focus, .btn.focus {
          outline: 0;
          box-shadow: 0 0 0 0.15rem rgba(44, 123, 229, 0.25); }
        .btn.disabled, .btn:disabled {
          opacity: 0.65; }
      
      a.btn.disabled,
      fieldset:disabled a.btn {
        pointer-events: none; }
      
      .btn-primary {
        color: #FFFFFF;
        background-color: #2C7BE5;
        border-color: #2C7BE5; }
        .btn-primary:hover {
          color: #FFFFFF;
          background-color: #1a68d1;
          border-color: #1862c6; }
        .btn-primary:focus, .btn-primary.focus {
          box-shadow: 0 0 0 0.15rem rgba(76, 143, 233, 0.5); }
        .btn-primary.disabled, .btn-primary:disabled {
          color: #FFFFFF;
          background-color: #2C7BE5;
          border-color: #2C7BE5; }
        .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,
        .show > .btn-primary.dropdown-toggle {
          color: #FFFFFF;
          background-color: #1862c6;
          border-color: #175dba; }
          .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,
          .show > .btn-primary.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(76, 143, 233, 0.5); }
      
      .btn-secondary {
        color: #FFFFFF;
        background-color: #6E84A3;
        border-color: #6E84A3; }
        .btn-secondary:hover {
          color: #FFFFFF;
          background-color: #5b7190;
          border-color: #566b88; }
        .btn-secondary:focus, .btn-secondary.focus {
          box-shadow: 0 0 0 0.15rem rgba(132, 150, 177, 0.5); }
        .btn-secondary.disabled, .btn-secondary:disabled {
          color: #FFFFFF;
          background-color: #6E84A3;
          border-color: #6E84A3; }
        .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
        .show > .btn-secondary.dropdown-toggle {
          color: #FFFFFF;
          background-color: #566b88;
          border-color: #516580; }
          .btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,
          .show > .btn-secondary.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(132, 150, 177, 0.5); }
      
      .btn-success {
        color: #FFFFFF;
        background-color: #00D97E;
        border-color: #00D97E; }
        .btn-success:hover {
          color: #FFFFFF;
          background-color: #00b368;
          border-color: #00a660; }
        .btn-success:focus, .btn-success.focus {
          box-shadow: 0 0 0 0.15rem rgba(38, 223, 145, 0.5); }
        .btn-success.disabled, .btn-success:disabled {
          color: #FFFFFF;
          background-color: #00D97E;
          border-color: #00D97E; }
        .btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active,
        .show > .btn-success.dropdown-toggle {
          color: #FFFFFF;
          background-color: #00a660;
          border-color: #009959; }
          .btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus,
          .show > .btn-success.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(38, 223, 145, 0.5); }
      
      .btn-info {
        color: #FFFFFF;
        background-color: #39afd1;
        border-color: #39afd1; }
        .btn-info:hover {
          color: #FFFFFF;
          background-color: #2b99b9;
          border-color: #2991ae; }
        .btn-info:focus, .btn-info.focus {
          box-shadow: 0 0 0 0.15rem rgba(87, 187, 216, 0.5); }
        .btn-info.disabled, .btn-info:disabled {
          color: #FFFFFF;
          background-color: #39afd1;
          border-color: #39afd1; }
        .btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active,
        .show > .btn-info.dropdown-toggle {
          color: #FFFFFF;
          background-color: #2991ae;
          border-color: #2688a4; }
          .btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus,
          .show > .btn-info.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(87, 187, 216, 0.5); }
      
      .btn-warning {
        color: #283E59;
        background-color: #F6C343;
        border-color: #F6C343; }
        .btn-warning:hover {
          color: #283E59;
          background-color: #f4b71e;
          border-color: #f4b312; }
        .btn-warning:focus, .btn-warning.focus {
          box-shadow: 0 0 0 0.15rem rgba(215, 175, 70, 0.5); }
        .btn-warning.disabled, .btn-warning:disabled {
          color: #283E59;
          background-color: #F6C343;
          border-color: #F6C343; }
        .btn-warning:not(:disabled):not(.disabled):active, .btn-warning:not(:disabled):not(.disabled).active,
        .show > .btn-warning.dropdown-toggle {
          color: #283E59;
          background-color: #f4b312;
          border-color: #eead0b; }
          .btn-warning:not(:disabled):not(.disabled):active:focus, .btn-warning:not(:disabled):not(.disabled).active:focus,
          .show > .btn-warning.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(215, 175, 70, 0.5); }
      
      .btn-danger {
        color: #FFFFFF;
        background-color: #E63757;
        border-color: #E63757; }
        .btn-danger:hover {
          color: #FFFFFF;
          background-color: #db1b3f;
          border-color: #d01a3b; }
        .btn-danger:focus, .btn-danger.focus {
          box-shadow: 0 0 0 0.15rem rgba(234, 85, 112, 0.5); }
        .btn-danger.disabled, .btn-danger:disabled {
          color: #FFFFFF;
          background-color: #E63757;
          border-color: #E63757; }
        .btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active,
        .show > .btn-danger.dropdown-toggle {
          color: #FFFFFF;
          background-color: #d01a3b;
          border-color: #c51938; }
          .btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus,
          .show > .btn-danger.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(234, 85, 112, 0.5); }
      
      .btn-light {
        color: #283E59;
        background-color: #EDF2F9;
        border-color: #EDF2F9; }
        .btn-light:hover {
          color: #283E59;
          background-color: #d0ddef;
          border-color: #c7d6ec; }
        .btn-light:focus, .btn-light.focus {
          box-shadow: 0 0 0 0.15rem rgba(207, 215, 225, 0.5); }
        .btn-light.disabled, .btn-light:disabled {
          color: #283E59;
          background-color: #EDF2F9;
          border-color: #EDF2F9; }
        .btn-light:not(:disabled):not(.disabled):active, .btn-light:not(:disabled):not(.disabled).active,
        .show > .btn-light.dropdown-toggle {
          color: #283E59;
          background-color: #c7d6ec;
          border-color: #bdcfe9; }
          .btn-light:not(:disabled):not(.disabled):active:focus, .btn-light:not(:disabled):not(.disabled).active:focus,
          .show > .btn-light.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(207, 215, 225, 0.5); }
      
      .btn-dark {
        color: #FFFFFF;
        background-color: #12263F;
        border-color: #12263F; }
        .btn-dark:hover {
          color: #FFFFFF;
          background-color: #0a1421;
          border-color: #070e17; }
        .btn-dark:focus, .btn-dark.focus {
          box-shadow: 0 0 0 0.15rem rgba(54, 71, 92, 0.5); }
        .btn-dark.disabled, .btn-dark:disabled {
          color: #FFFFFF;
          background-color: #12263F;
          border-color: #12263F; }
        .btn-dark:not(:disabled):not(.disabled):active, .btn-dark:not(:disabled):not(.disabled).active,
        .show > .btn-dark.dropdown-toggle {
          color: #FFFFFF;
          background-color: #070e17;
          border-color: #04080d; }
          .btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus,
          .show > .btn-dark.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(54, 71, 92, 0.5); }
      
      .btn-white {
        color: #283E59;
        background-color: #FFFFFF;
        border-color: #FFFFFF; }
        .btn-white:hover {
          color: #283E59;
          background-color: #ececec;
          border-color: #e6e6e6; }
        .btn-white:focus, .btn-white.focus {
          box-shadow: 0 0 0 0.15rem rgba(223, 226, 230, 0.5); }
        .btn-white.disabled, .btn-white:disabled {
          color: #283E59;
          background-color: #FFFFFF;
          border-color: #FFFFFF; }
        .btn-white:not(:disabled):not(.disabled):active, .btn-white:not(:disabled):not(.disabled).active,
        .show > .btn-white.dropdown-toggle {
          color: #283E59;
          background-color: #e6e6e6;
          border-color: #dfdfdf; }
          .btn-white:not(:disabled):not(.disabled):active:focus, .btn-white:not(:disabled):not(.disabled).active:focus,
          .show > .btn-white.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(223, 226, 230, 0.5); }
      
      .btn-outline-primary {
        color: #2C7BE5;
        border-color: #2C7BE5; }
        .btn-outline-primary:hover {
          color: #FFFFFF;
          background-color: #2C7BE5;
          border-color: #2C7BE5; }
        .btn-outline-primary:focus, .btn-outline-primary.focus {
          box-shadow: 0 0 0 0.15rem rgba(44, 123, 229, 0.5); }
        .btn-outline-primary.disabled, .btn-outline-primary:disabled {
          color: #2C7BE5;
          background-color: transparent; }
        .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active,
        .show > .btn-outline-primary.dropdown-toggle {
          color: #FFFFFF;
          background-color: #2C7BE5;
          border-color: #2C7BE5; }
          .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-primary.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(44, 123, 229, 0.5); }
      
      .btn-outline-secondary {
        color: #6E84A3;
        border-color: #6E84A3; }
        .btn-outline-secondary:hover {
          color: #FFFFFF;
          background-color: #6E84A3;
          border-color: #6E84A3; }
        .btn-outline-secondary:focus, .btn-outline-secondary.focus {
          box-shadow: 0 0 0 0.15rem rgba(110, 132, 163, 0.5); }
        .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {
          color: #6E84A3;
          background-color: transparent; }
        .btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active,
        .show > .btn-outline-secondary.dropdown-toggle {
          color: #FFFFFF;
          background-color: #6E84A3;
          border-color: #6E84A3; }
          .btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-secondary.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(110, 132, 163, 0.5); }
      
      .btn-outline-success {
        color: #00D97E;
        border-color: #00D97E; }
        .btn-outline-success:hover {
          color: #FFFFFF;
          background-color: #00D97E;
          border-color: #00D97E; }
        .btn-outline-success:focus, .btn-outline-success.focus {
          box-shadow: 0 0 0 0.15rem rgba(0, 217, 126, 0.5); }
        .btn-outline-success.disabled, .btn-outline-success:disabled {
          color: #00D97E;
          background-color: transparent; }
        .btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active,
        .show > .btn-outline-success.dropdown-toggle {
          color: #FFFFFF;
          background-color: #00D97E;
          border-color: #00D97E; }
          .btn-outline-success:not(:disabled):not(.disabled):active:focus, .btn-outline-success:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-success.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(0, 217, 126, 0.5); }
      
      .btn-outline-info {
        color: #39afd1;
        border-color: #39afd1; }
        .btn-outline-info:hover {
          color: #FFFFFF;
          background-color: #39afd1;
          border-color: #39afd1; }
        .btn-outline-info:focus, .btn-outline-info.focus {
          box-shadow: 0 0 0 0.15rem rgba(57, 175, 209, 0.5); }
        .btn-outline-info.disabled, .btn-outline-info:disabled {
          color: #39afd1;
          background-color: transparent; }
        .btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active,
        .show > .btn-outline-info.dropdown-toggle {
          color: #FFFFFF;
          background-color: #39afd1;
          border-color: #39afd1; }
          .btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-info.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(57, 175, 209, 0.5); }
      
      .btn-outline-warning {
        color: #F6C343;
        border-color: #F6C343; }
        .btn-outline-warning:hover {
          color: #283E59;
          background-color: #F6C343;
          border-color: #F6C343; }
        .btn-outline-warning:focus, .btn-outline-warning.focus {
          box-shadow: 0 0 0 0.15rem rgba(246, 195, 67, 0.5); }
        .btn-outline-warning.disabled, .btn-outline-warning:disabled {
          color: #F6C343;
          background-color: transparent; }
        .btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active,
        .show > .btn-outline-warning.dropdown-toggle {
          color: #283E59;
          background-color: #F6C343;
          border-color: #F6C343; }
          .btn-outline-warning:not(:disabled):not(.disabled):active:focus, .btn-outline-warning:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-warning.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(246, 195, 67, 0.5); }
      
      .btn-outline-danger {
        color: #E63757;
        border-color: #E63757; }
        .btn-outline-danger:hover {
          color: #FFFFFF;
          background-color: #E63757;
          border-color: #E63757; }
        .btn-outline-danger:focus, .btn-outline-danger.focus {
          box-shadow: 0 0 0 0.15rem rgba(230, 55, 87, 0.5); }
        .btn-outline-danger.disabled, .btn-outline-danger:disabled {
          color: #E63757;
          background-color: transparent; }
        .btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active,
        .show > .btn-outline-danger.dropdown-toggle {
          color: #FFFFFF;
          background-color: #E63757;
          border-color: #E63757; }
          .btn-outline-danger:not(:disabled):not(.disabled):active:focus, .btn-outline-danger:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-danger.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(230, 55, 87, 0.5); }
      
      .btn-outline-light {
        color: #EDF2F9;
        border-color: #EDF2F9; }
        .btn-outline-light:hover {
          color: #283E59;
          background-color: #EDF2F9;
          border-color: #EDF2F9; }
        .btn-outline-light:focus, .btn-outline-light.focus {
          box-shadow: 0 0 0 0.15rem rgba(237, 242, 249, 0.5); }
        .btn-outline-light.disabled, .btn-outline-light:disabled {
          color: #EDF2F9;
          background-color: transparent; }
        .btn-outline-light:not(:disabled):not(.disabled):active, .btn-outline-light:not(:disabled):not(.disabled).active,
        .show > .btn-outline-light.dropdown-toggle {
          color: #283E59;
          background-color: #EDF2F9;
          border-color: #EDF2F9; }
          .btn-outline-light:not(:disabled):not(.disabled):active:focus, .btn-outline-light:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-light.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(237, 242, 249, 0.5); }
      
      .btn-outline-dark {
        color: #12263F;
        border-color: #12263F; }
        .btn-outline-dark:hover {
          color: #FFFFFF;
          background-color: #12263F;
          border-color: #12263F; }
        .btn-outline-dark:focus, .btn-outline-dark.focus {
          box-shadow: 0 0 0 0.15rem rgba(18, 38, 63, 0.5); }
        .btn-outline-dark.disabled, .btn-outline-dark:disabled {
          color: #12263F;
          background-color: transparent; }
        .btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active,
        .show > .btn-outline-dark.dropdown-toggle {
          color: #FFFFFF;
          background-color: #12263F;
          border-color: #12263F; }
          .btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-dark.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(18, 38, 63, 0.5); }
      
      .btn-outline-white {
        color: #FFFFFF;
        border-color: #FFFFFF; }
        .btn-outline-white:hover {
          color: #283E59;
          background-color: #FFFFFF;
          border-color: #FFFFFF; }
        .btn-outline-white:focus, .btn-outline-white.focus {
          box-shadow: 0 0 0 0.15rem rgba(255, 255, 255, 0.5); }
        .btn-outline-white.disabled, .btn-outline-white:disabled {
          color: #FFFFFF;
          background-color: transparent; }
        .btn-outline-white:not(:disabled):not(.disabled):active, .btn-outline-white:not(:disabled):not(.disabled).active,
        .show > .btn-outline-white.dropdown-toggle {
          color: #283E59;
          background-color: #FFFFFF;
          border-color: #FFFFFF; }
          .btn-outline-white:not(:disabled):not(.disabled):active:focus, .btn-outline-white:not(:disabled):not(.disabled).active:focus,
          .show > .btn-outline-white.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.15rem rgba(255, 255, 255, 0.5); }
      
      .btn-link {
        font-weight: 400;
        color: #2C7BE5;
        text-decoration: none; }
        .btn-link:hover {
          color: #1657af;
          text-decoration: none; }
        .btn-link:focus, .btn-link.focus {
          text-decoration: none;
          box-shadow: none; }
        .btn-link:disabled, .btn-link.disabled {
          color: #B1C2D9;
          pointer-events: none; }
      
      .btn-lg, .btn-group-lg > .btn {
        padding: 0.5rem 1rem;
        font-size: 1.0625rem;
        line-height: 1.5;
        border-radius: 0.5rem; }
      
      .btn-sm, .btn-group-sm > .btn {
        padding: 0.125rem 0.5rem;
        font-size: 0.8125rem;
        line-height: 1.75;
        border-radius: 0.25rem; }
      
      .btn-block {
        display: block;
        width: 100%; }
        .btn-block + .btn-block {
          margin-top: 0.5rem; }
      
      input[type="submit"].btn-block,
      input[type="reset"].btn-block,
      input[type="button"].btn-block {
        width: 100%; }
    `}
    </style>
  </>
);

export default Button;
